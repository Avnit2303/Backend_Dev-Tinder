const express = require("express")
const requestsRouter = express.Router()
const userauth = require("../middlewares/auth")

requestsRouter.post("/connectionreq", userauth, async (req, res) => {
    try {
        const user = req.user
        res.send("send a connection req is" + " " + user.firstname)
    }
    catch (error) {
        res.send(error)

    }
})


module.exports = requestsRouter