const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const app = express();
const proposal=require("./Routes/route")

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL)
    .then((response) => {
        console.log("connected to mongod DB successfully!");
    })
    .catch(err => {
        console.log("connection to DB failed", err);
    })

app.get("/",(req,res)=>{
    res.send("Welcome to event proposal API")
})

app.use("/api",proposal)

 app.listen(PORT,()=>{
 console.log(`Server is running on port ${PORT}...`)
})