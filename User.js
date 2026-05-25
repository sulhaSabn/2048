const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

   username:{
      type:String,
      unique:true
   },

   password:String,

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

   usedTxids:[String],

   createdAt:{
      type:Date,
      default:Date.now
   }

});

module.exports = mongoose.model("User", UserSchema);
