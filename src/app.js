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
const http = require("http");
const initialzesocket = require("./utils/socket.js");
const chatRouter = require("./routers/chat.js");


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);
app.use(express.json());
app.use(cookieParser());
app.use("/", authrouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter)
app.use("/",chatRouter)

const server = http.createServer(app);
initialzesocket(server)

ConnectDB().then(() => {
    console.log("Database connected");
    server.listen(3000, () => {
        console.log("server is successfully listen on port 3000");

    })
}).catch("not connected");

