const express = require("express");
const app = express();
const { ConnectDB } = require("./confing/database");
const users = require("./models/user");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const authrouter = require("./routers/auth.js")
const profileRouter = require("./routers/profile.js")
const requestsRouter = require("./routers/request.js");
const userRouter = require("./routers/user.js");


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
})
);
app.use(express.json());
app.use(cookieParser());
app.use("/",authrouter);
app.use("/",profileRouter);
app.use("/",requestsRouter);
app.use("/",userRouter)


app.patch("/userupdate/:userid", async (req, res) => {
    const userid = req.params.userid;
    const data = req.body;
    try {
        const validatefield = ["firstname", "lastname", "skill", "password", "gender"];
        const validateupdatefiled = Object.keys(data).every((k) => validatefield.includes(k));
        if (!validateupdatefiled) {
            throw new Error("you are not update the field")
        }
        if (data?.skill.length > 10) {
            throw new Error("skill not must be 10")
        }
        console.log(data);
        const update = await users.findByIdAndUpdate(userid, data, { runValidators: true });
        res.send("updated");
    }
    catch (err) {
        res.status(400).send("not updated" + err.message)
    }
})

ConnectDB().then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("server is successfully listen on port 3000");

    })
}).catch("not connected");

