const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

   username:String,

   password:String,

   guest:{
      type:Boolean,
      default:false
   },

   walletAddress:String,

   privateKey:String,

   coins:{
      type:Number,
      default:50
   },

   usdtBalance:{
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

   skins:{
      type:Array,
      default:["default"]
   },

   activeSkin:{
      type:String,
      default:"default"
   },

   usedTxids:[String],

   createdAt:{
      type:Date,
      default:Date.now
   }

});

module.exports = mongoose.model("User", UserSchema);
