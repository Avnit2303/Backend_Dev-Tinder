const express = require("express")
const profileRouter = express.Router()
const userauth = require("../middlewares/auth")
const { validatedata } = require("../utils/signupvalidation")

profileRouter.get("/profile/view", userauth, async (req, res) => {
    try {
    const user = req.user;
    res.status(200).json({ message: "user verify", data: user });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized user" });
  }
});


profileRouter.patch("/profile/edit", userauth, async (req, res) => {
    try {
        const valid = validatedata(req)
        if (!valid) {
            throw new Error("invalid edit request")
        }
        const logineduser = req.user
        console.log("login user" + logineduser);

        Object.keys(req.body).forEach((key) => (logineduser[key] = req.body[key]))
        await logineduser.save()
        console.log("edited user" + logineduser);
        res.json({
            message: `${logineduser.firstname}, your profile updated `,
            data: logineduser,
        }
        )
    }
    catch (err) {
        res.status(400).send("ERROR :-" + err.message)
    }
})


module.exports = profileRouter;