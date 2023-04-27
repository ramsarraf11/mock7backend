const {Router}=require("express")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {userModel} = require("../models/userModel")

const user = Router()



user.post("/register",async(req,res)=>{
    try {
        let {Profilepicture,Name,Bio,Phone,Email,Password} = req.body
        bcrypt.hash(Password,5, async (err, hash)=> {
            let data = userModel({Profilepicture,Name,Bio,Phone,Email,Password:hash})
            await data.save()
            res.send("User Registered")
        });
    } catch (error) {
        console.log(error)
    }
})

user.post("/login",async(req,res)=>{
    try {
        let {Name,Password} = req.body
        let data = await userModel.find({Name})
        if(data.length>0){
            bcrypt.compare(Password, data[0].Password,(err, result)=> {
                if(result){
                    let token = jwt.sign({ userID:data[0]._id }, process.env.secretKey);
                    res.send({"message":"loggedIn successfully","token":token})
                }else{
                    res.send("wrong details1")
                    console.log(err)
                }
            });
        }else{
            res.send("wrong details2")
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports={user}