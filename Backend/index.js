const express=require("express");
const cors=require("cors");
const multer=require("multer");
const User=require("./Models/user")
const ClaimHistory = require("./Models/claimHistory");
const mongoose=require("mongoose")
const upload = require("./Middlewares/multer");
require('dotenv').config()


const app=express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://scorely-frontend.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));

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




app.post("/claim", async (req, res) => {
  const { userName, points } = req.body;

  try {
    const entry = await ClaimHistory.create({ userName, points });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: "Error saving claim history" });
  }
});



app.get("/history", async (req, res) => {
  try {
    const history = await ClaimHistory.find().sort({ claimedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch history" });
  }
});




app.listen(PORT,()=>{
console.log(`App is Running on port ${PORT}`)
})

