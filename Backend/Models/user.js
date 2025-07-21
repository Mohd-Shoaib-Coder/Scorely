const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique:true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },

  userPoints:{
    type:Number,
    default:0,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
