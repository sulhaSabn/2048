const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

   username:String,

   password:String,

   walletAddress:String,

   privateKey:String,

   coins:{
      type:Number,
      default:50
   },

   usedTxids:{
      type:[String],
      default:[]
   },

   bestScore:{
      type:Number,
      default:0
   },

   level:{
      type:Number,
      default:1
   },

   createdAt:{
      type:Date,
      default:Date.now
   }

});

module.exports =
mongoose.model("User", UserSchema);
