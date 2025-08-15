const jwt = require("jsonwebtoken")
const users = require("../models/user")

const userauth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error("token is not exist")
        }
        const decodedmsg = jwt.verify(token, "avnit@gmail.com")
        const { _id } = decodedmsg
        const user = await users.findOne({ _id })
        if (!user) {
            throw new Error("user not exist")
        }
        req.user = user
        next();
    }
    catch (err) {
        res.send("ERROR:-" + err)
    }
}

module.exports = userauth