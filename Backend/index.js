const express=require("express");
const cors=require("cors");
const multer=require("multer");
const User=require("./Models/user")
const mongoose=require("mongoose")
const upload = require("./Middlewares/multer");
require('dotenv').config()


const app=express();
app.use(cors({
   origin:"http://localhost:5173",
   methods:["GET","POST"],
   credentials:true
}))

app.use("/uploads", express.static("uploads"));
app.use(express.json());


const PORT =process.env.PORT || 8000;


mongoose.connect(process.env.MONGO_KEY).then(()=>console.log("Database connected"))



app.post("/createUser",upload.single("image"),async function(req,res){

  
   const {userName}=req.body;
   const imagePath=req.file?.path;
   
if(!userName || !imagePath){
   return res.status(400).json({error:"userName or Image missnig"})
}

// console.log("username",userName)
// console.log("image",image)

try{

   const user=await User.create({
      userName,
      image:imagePath,
   })
   res.json(user)
}catch(e){
   res.status(400).json(e)
}


    
//   return res.json({ message: "User received", userName, image });
})



app.listen(PORT,()=>{
console.log(`App is Running on port ${PORT}`)
})

//no544Bphetdp8Xa8
//mongodb+srv://000sheikhsiddiqui:no544Bphetdp8Xa8@cluster0.ifv3tzr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0