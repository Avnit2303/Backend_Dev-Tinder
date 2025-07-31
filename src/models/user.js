const monggose = require("mongoose");

const userschema = new monggose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:4,
        maxLength:15
    },
    lastname:{
        type:String,
        default:"Avnit",
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    }
},
{
    timestamps:true,
}
);

 

module.exports =  monggose.model("User",userschema);