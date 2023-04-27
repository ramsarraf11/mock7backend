const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    Profilepicture:String,
    Name:String,
    Bio:String,
    Phone:String,
    Email:String,
    Password:String
})
const userModel = new mongoose.model("userdata", userSchema)
module.exports = { userModel }