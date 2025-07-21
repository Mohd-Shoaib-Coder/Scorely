const mongoose = require("mongoose");

const claimHistorySchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  claimedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ClaimHistory", claimHistorySchema);
