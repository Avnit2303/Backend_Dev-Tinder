const monggose = require("mongoose")
const ConnectDB = async() => {
await monggose.connect("mongodb+srv://gadhiyaavnit:Avnit%402303@devtinder.gfw9t4x.mongodb.net/d_tinder");
}



module.exports = {ConnectDB}
