const express=require("express");
const app=express();
require('dotenv').config()

app.use(express.json())


const PORT =process.env.PORT || 8000;

app.get("/",function(req,res){

    console.log("My backend is running ")
    
})





app.listen(PORT,()=>{
console.log(`App is Running on port ${PORT}`)
})

