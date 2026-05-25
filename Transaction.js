const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({

   userId:String,

   txid:String,

   amount:Number,

   coins:Number,

   createdAt:{
      type:Date,
      default:Date.now
   }

});

module.exports = mongoose.model("Transaction", TransactionSchema);
