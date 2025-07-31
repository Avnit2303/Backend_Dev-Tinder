const monggose = require("mongoose");

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
},
    {
        timestamps: true,
    }
);



module.exports = monggose.model("User", userschema);