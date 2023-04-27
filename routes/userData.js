const { Router } = require("express")
const { userModel } = require("../models/userModel")

const data = Router()

data.get("/getProfile", async (req, res) => {
    try {
        let data = await userModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

data.post("/addProfile", async (req, res) => {
    try {
        let payload = req.body
        let data = userModel(payload)
        await data.save()
        res.send("New Data Added")
    } catch (error) {
        console.log(error)
    }
})

data.patch("/editProfile/:id", async (req, res) => {
    try {
        let ID = req.params.id
        let payload = req.body
        await userModel.findByIdAndUpdate({ _id: ID },payload)
        res.send(`data with ${ID} got updated`)
    } catch (error) {
        console.log(error)
    }
})

data.delete("/deleteProfile/:id", async (req, res) => {
    try {
        let ID = req.params.id
        await userModel.findByIdAndDelete({ _id: ID })
        res.send(`data with ${ID} got deleted`)
    } catch (error) {
        console.log(error)
    }
})


module.exports = { data }