const jwt = require("jsonwebtoken")
const users = require("../models/user")

const userauth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({message : "Please login"})
        }
        const decodedmsg = jwt.verify(token, "avnit@gmail.com")
        const { _id } = decodedmsg
        const user = await users.findOne({ _id })
        if (!user) {
            return res.status(404).json({message : "User not found"})
        }
        req.user = user
        next();
    }
    catch (err) {
         return res.status(500).json({message : "server erorr"})
    }
}

module.exports = userauth