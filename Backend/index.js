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
   const {userPoints}=req.body;
   
if(!userName || !imagePath || !userPoints){
   return res.status(400).json({error:"userName or Image missnig"})
}


try{

   const user=await User.create({
      userName,
      image:imagePath,
      userPoints,
   })
   res.json(user)
}catch(e){
   res.status(400).json(e)
}


    
//   return res.json({ message: "User received", userName, image });
})


app.get("/sendUser",async function(req,res){

try{

   const sendUsers=await User.find();
res.json(sendUsers)

}catch(e){
res.status(400).json(e)
}

})







app.post("/updatePoints", async (req, res) => {
  const { userName, points } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.userPoints += points;
    await user.save();

    res.json({ message: "Points updated", user });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




app.listen(PORT,()=>{
console.log(`App is Running on port ${PORT}`)
})

