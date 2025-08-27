const express = require("express")
const requestsRouter = express.Router()
const userauth = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const users = require("../models/user")

requestsRouter.post("/request/send/:status/:touserid", userauth, async (req, res) => {
    try {
        const fromuserid = req.user._id;
        const touserid = req.params.touserid
        const status = req.params.status
        console.log(status);


        const allowedstatus = ["interested", "ignored"]
        if (!allowedstatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type" + status
            })
        }

        const touser = await users.findById(touserid)
        if (!touser) {
            return res.status(404).json({ message: "user not found " })
        }

        const checkconnection = await ConnectionRequestModel.findOne({
            $or: [
                { fromuserid, touserid },
                { fromuserid: touserid, touserid: fromuserid }
            ]
        })

        if (checkconnection) {
            return res.status(404).json({ message: "connection already exists" })
        }

        const connectionreq = new ConnectionRequestModel(
            {
                fromuserid,
                touserid,
                status
            }
        )

        const data = await connectionreq.save();

        return res.json({
            message: req.user.firstname + " is" + status + " in" + touser.firstname,
            data
        })
    }
    catch (error) {
        console.error("Save error:", error);

        res.status(400).send("Error" + error)

    }
})

requestsRouter.post("/request/review/:status/:reqid", userauth, async (req, res) => {
    try {
        const loggeduser = req.user;
        const { status, reqid } = req.params;
        console.log(reqid);
        console.log(loggeduser);
        

        const allowedstatus = ["accepeted", "rejected"]
        if (!allowedstatus.includes(status)) {
            return res.status(400).json({ message: "status not allowed" })
        }
        const checkconnection = await ConnectionRequestModel.findOne({
            _id: reqid,
            touserid: loggeduser._id,
            status: "interested",
        });
        if (!checkconnection) {
            return res.status(404).json({ message: "connection request not found " })
        }
        checkconnection.status = status;
        const data = await checkconnection.save();
        return res.json({ message: "connection request" + status, data })
    }
    catch (error) {
        res.status(400).send("ERROR" + error)
    }
})

module.exports = requestsRouter