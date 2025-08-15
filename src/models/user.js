const monggose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator");



const userschema = new monggose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: 15
    },
    lastname: {
        type: String,
        default: "Avnit",
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        validator(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender is not valid")
            }
        },
    },
    skill: {
        type: [String]
    },
    about: {
        type: String
    },
},
    {
        timestamps: true,
    }
);

userschema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "avnit@gmail.com")
    return token;
}

userschema.methods.validatepassword = async function (inputbyuserpass) {
    const user = this;
    const passwordhash = user.password
    const isvalidpass = await bcrypt.compare(inputbyuserpass, passwordhash);
    return isvalidpass
}

module.exports = monggose.model("User", userschema);