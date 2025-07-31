const monggose = require("mongoose");

const userschema = new monggose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

 

module.exports =  monggose.model("User",userschema);