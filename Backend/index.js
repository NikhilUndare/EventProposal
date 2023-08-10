const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb+srv://nikundare111:Nikhil@cluster0.qmkdjbw.mongodb.net/EventProposal?retryWrites=true&w=majority')
    .then((response) => {
        console.log("connected to mongod DB successfully!");
    })
    .catch(err => {
        console.log("connection to DB failed", err);
    })

app.use((req,res)=>{
    res.send("it is working")
})

 app.listen(PORT,()=>{
 console.log(`Server is running on port ${PORT}...`)
})