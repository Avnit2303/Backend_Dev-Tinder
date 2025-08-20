const express = require("express");
const userauth = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const user = require("../models/user");
const userRouter = express.Router();

const USER_DATA = "firstname lastname skill about gender age"

userRouter.get("/user/request/receiver", userauth, async (req, res) => {
    try {
        const loggeduser = req.user;
        const checkcoonection = await ConnectionRequestModel.find({
            touserid: loggeduser._id,
            status: "interested",
        }).populate("fromuserid" + USER_DATA)
        res.json({
            message: "data feched succesfully",
            data: checkcoonection
        })
    }
    catch (error) {
        res.status(400).send("ERROR" + error.message)
    }
})

userRouter.get("/user/connection", userauth, async (req, res) => {
    try {
        const loggeduser = req.user;
        const checkconnection = await ConnectionRequestModel.find({
            $or: [
                { touserid: loggeduser._id, status: "accepeted" },
                { fromuserid: loggeduser._id, status: "accepeted" }
            ]
        }).populate("fromuserid" + USER_DATA).populate("touserid" + USER_DATA)
        console.log(checkconnection);

        const data = checkconnection.map((row) => {
            if (row.fromuserid._id.toString() === loggeduser._id.toString()) {
                return row.touserid;
            }
            else {
                return row.fromuserid;
            }
        })
        res.json({ data })
    }
    catch (error) {
        res.status(400).send("ERROR" + error)
    }
})


userRouter.get("/user/feed", userauth, async (req, res) => {
    try {
        const loggedin = req.user;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit
        const skip = (page - 1) * limit;

        const checkconnection = await ConnectionRequestModel.find({
            $or: [
                { touserid: loggedin._id },
                { fromuserid: loggedin._id }
            ]
        }).select("fromuserid touserid");


        const hideuser = new Set();
        checkconnection.forEach((req) => {
            hideuser.add(req.touserid.toString());
            hideuser.add(req.fromuserid.toString());
        });


        const usersList = await user.find({
            $and: [
                { _id: { $nin: Array.from(hideuser) } },
                { _id: { $ne: loggedin._id } },
            ],
        })
            .select(USER_DATA)
            .skip(skip)
            .limit(limit);

        res.json({
            page,
            limit,
            count: usersList.length,
            data: usersList
        });

    } catch (error) {
        res.status(400).send("ERROR: " + error.message);
    }
});



module.exports = userRouter