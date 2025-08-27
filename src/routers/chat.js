const express = require("express");
const {Chat} = require("../models/chart");
const userauth = require("../middlewares/auth");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetuserid",userauth, async (req, res) => {
    const { targetuserid} = req.params;
    console.log(targetuserid);
    
    const userId = req.user._id;
    try {
        let chat = await Chat.findOne({
            partcipants:{$all:[userId,targetuserid]}
        }).populate({
            path:"messages.senderId",
            select:"firstname lastname",
        })
        if(!chat){
            chat =  new Chat({
                partcipants:[userId,targetuserid],
                messages:[],
            });
            await chat.save();
        }
        res.json(chat)
    }
    catch (err) {
        console.log(err);

    }
})


module.exports = chatRouter