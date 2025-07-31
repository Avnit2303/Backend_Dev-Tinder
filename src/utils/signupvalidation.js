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

module.exports = { validatesignupdata }