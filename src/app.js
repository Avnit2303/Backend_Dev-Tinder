const express = require("express");
const app = express();
const { ConnectDB } = require("./confing/database");
const users = require("./models/user");
app.use(express.json())

app.post("/signup", async (req, res) => {
    try {
        const user = users(req.body);
        await user.save();
        res.send("sucesfully");
    }
    catch (err) {
        res.status(400).send("message not sent" + err.message)
    }
})

app.get("/user", async (req, res) => {
    try {
        // const emailid = req.body.email;
        const userone = await users.find({})
        // console.log(userone);
        res.send(userone)
    }
    catch (err) {
        res.status(400).send("not find user", err.message)
    }

})

app.delete("/userdelete", async (req, res) => {
    try {
        const userid = req.body.userid;
        const userdel = await users.findOneAndDelete(userid)
        res.send("user deleted");
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})
app.patch("/userupdate", async (req, res) => {
    const userid = req.body.userid;
    const data = req.body;
    try {
        console.log(data);
        const update = await users.findByIdAndUpdate( userid , data , {runValidators:true});
        res.send("updated");
    }
    catch (err) {
        res.status(400).send("not updated"+err.message)
    }
})

ConnectDB().then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("server is successfully listen on port 3000");

    })
}).catch("not connected");

