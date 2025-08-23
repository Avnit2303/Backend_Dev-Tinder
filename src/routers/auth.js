const express = require("express");
const { validatesignupdata } = require("../utils/signupvalidation");
const bcrypt = require("bcrypt")
const users = require("../models/user");
const authrouter = express.Router()

authrouter.post("/signup", async (req, res) => {
    try {
        // console.log(req.body);
        
        //check validation
        // validatesignupdata(req)

        const { fName, lName, email, password } = req.body;
        //encrypt password
        console.log(fName,lName,email,password);

        const checkemail = await users.findOne({email:email})
        console.log(checkemail);
        
        if(checkemail){
             res.status(401).json({message:"email id already exist"})
        }
        
        const passwordhash = await bcrypt.hash(password, 10);
        // console.log(passwordhash);

        const user = users(
            {
                firstname:fName,
                lastname:lName,
                email,
                password: passwordhash
            }
        );
        await user.save();
        res.status(200).json({message:"successfully"});
    }
    catch (err) {
        res.status(400).json({Error:err})
    }
})

authrouter.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
         console.log(email);

        const user = await users.findOne({ email: email })
        if (!user) {
          return  res.status(401).json({message:"invalid email id"})
        }
        const passwords = await user.validatepassword(password)
        if (!password) {
          return  res.json({message:"invalid password"})
        }
        console.log(passwords);

        if (passwords) {
            const token = await user.getJWT()
            res.cookie("token", token);
            res.status(200).json({message:"succesfully"})
        }
        else {
            return res.status(401).json({message:"invalid password"})
        }
    }
    catch (err) {
        res.status(400).json({message: err});
    }
})

authrouter.get("/logout", async (req,res) =>{
    res.cookie("token",null, {
        expires:new Date(Date.now())
    })
    res.send("logout successfully")
})

module.exports = authrouter;









