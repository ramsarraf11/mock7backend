const express = require("express")
const cors = require("cors")
require("dotenv").config()


const {user}=require("./routes/userRoute")
const {data}=require("./routes/userData")
const {connection}=require("./configs/db")
const {authentic}=require("./middlewares/authentication")


const app = express()
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/",user)
//app.use(authentic)
app.use("/",data)



app.listen((process.env.port),async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is on ${(process.env.port)}`)
})