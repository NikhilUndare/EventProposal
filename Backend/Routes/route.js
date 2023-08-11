const express = require('express');
const mongoose = require('mongoose');
const cloudinary=require('cloudinary').v2;
const propmodel=require("../Models/Proposals")
let router=express.Router();
const multer=require("multer")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

const fileStorageEngine=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./public")
  },
  filename:(req,file,cb)=>{
      cb(null,Date.now()+"-"+file.originalname) 
  }
})


const upload=multer({storage:fileStorageEngine});

cloudinary.config({ 
  cloud_name: 'dz6szmrzx', 
  api_key: '946256717551921', 
  api_secret: process.env.CLOUDINARY
});


router.post("/createProposal",upload.single("image"),(req,res)=>{
 let {Event_Name,
  Place_of_event,
  Proposal_type,
  From_date,
  To_date,
  Description,
  Food_preferances,
  Events}=req.body

  cloudinary.uploader.upload(req.file.path)
  .then(image=>{
    let new_proposal=new propmodel(
      {
        Event_Name,
        Place_of_event,
        Proposal_type,
        From_date,
        To_date,
        Description,
        Images:[image.url],
        Food_preferances,
        Events
      }
  )

  new_proposal.save()
  .then(data=>{
      res.status(201).json(data)
  })
  .catch(e=>{
      res.status(400).json({message:e.message})
  })
  })
  .catch(e=>{
    res.json({message:e.message})
  })

})


router.get("/getproposal",(req,res)=>{
  propmodel.find()
  .then(data=>{
    res.json({data})
  })
  .catch(e=>{
    res.json({message:e.message})
  })
})




module.exports=router;