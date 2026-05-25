const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

   username:String,

   password:String,

   walletAddress:String,

   privateKey:String,

   coins:{
      type:Number,
      default:0
   },

   level:{
      type:Number,
      default:1
   },

   score:{
      type:Number,
      default:0
   },

   bestScore:{
      type:Number,
      default:0
   },

   undoCount:{
      type:Number,
      default:0
   },

   bombCount:{
      type:Number,
      default:0
   },

   usedTxids:{
      type:[String],
      default:[]
   },

   createdAt:{
      type:Date,
      default:Date.now
   }

});

module.exports = mongoose.model("User",UserSchema);
