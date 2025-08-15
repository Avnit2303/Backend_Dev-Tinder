const validator = require("validator");

const validatesignupdata = (req) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname) {
        throw new Error("please enter name")
    }
    else if (!validator.isEmail(email)) {
        throw new Error("please enter correct email id")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter strong password")
    }
}


const validatedata = (req) =>{
    const allowedfileds = ["firstname","lastname","skill","about","gender"]
    const isvaliddata = Object.keys(req.body).every(filed => allowedfileds.includes(filed))
    return isvaliddata
}

module.exports = { validatesignupdata,validatedata }