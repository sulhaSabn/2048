const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

   username: {
      type: String,
      required: true,
      unique: true
   },

   password: {
      type: String,
      required: true
   },

   walletAddress: {
      type: String
   },

   privateKey: {
      type: String
   },

   coins: {
      type: Number,
      default: 50
   },

   usedTxids: {
      type: [String],
      default: []
   },

   bestScore: {
      type: Number,
      default: 0
   },

   score: {
      type: Number,
      default: 0
   },

   level: {
      type: Number,
      default: 1
   },

   usdtBalance: {
      type: Number,
      default: 0
   },

   guest: {
      type: Boolean,
      default: false
   },

   createdAt: {
      type: Date,
      default: Date.now
   }

});

module.exports = mongoose.model("User", UserSchema);
