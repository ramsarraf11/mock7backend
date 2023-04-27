const jwt = require("jsonwebtoken")
require("dotenv").config()
const authentic = (req,res,next)=>{
    let token = req.headers.authorization
    if(token){
        var decoded = jwt.verify(token, process.env.secretKey);
        if(decoded){
            const userID = decoded.userID
            req.body.userID=userID
            next()
        }else{
            res.send("Wrong details1")
        }
    }else{
        res.send("wrong details2")
    }
}

module.exports={authentic}