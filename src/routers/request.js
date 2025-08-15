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

        const allowedstatus = ["interested", "ignored"]
        if (!allowedstatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type" + status
            })
        }

        const touser = await users.findById(touserid)
        if(!touser){
            return res.status(404).json({message:"user not found "})
        }

        const checkconnection =await ConnectionRequestModel.findOne({
            $or:[
                {fromuserid,touserid},
                {fromuserid:touserid,touserid:fromuserid}
            ]
        })

        if(checkconnection){
           return res.status(404).json({message:"connection already exists"})
        }
        const connectionreq = new ConnectionRequestModel(
            {
                fromuserid,
                touserid,
                status
            }
        )
        const data = await connectionreq.save();
        res.json({
            message:"send connection request succesfully",
            data
        })
    }
    catch (error) {
       res.status(400).send("Error" +error)

    }
})


module.exports = requestsRouter