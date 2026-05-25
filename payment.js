const express = require("express");

const { TronWeb } = require("tronweb");

const User = require("./User");
const Transaction = require("./Transaction");

const router = express.Router();

const tronWeb = new TronWeb({
   fullHost:"https://api.trongrid.io"
});

router.post("/verify", async(req,res)=>{

   try{

      const {txid,userId} = req.body;

      const user =
      await User.findById(userId);

      if(!user){

         return res.json({
            success:false,
            message:"کاربر پیدا نشد"
         });

      }

      if(user.usedTxids.includes(txid)){

         return res.json({
            success:false,
            message:"TXID تکراری"
         });

      }

      const tx =
      await tronWeb.trx.getTransactionInfo(txid);

      if(!tx){

         return res.json({
            success:false,
            message:"تراکنش پیدا نشد"
         });

      }

      const coins = 500;

      user.coins += coins;

      user.usedTxids.push(txid);

      await user.save();

      await Transaction.create({

         userId,

         txid,

         coins

      });

      res.json({

         success:true,

         coins,

         message:"سکه اضافه شد"

      });

   }catch(err){

      console.log(err);

      res.json({

         success:false,

         message:"خطا"

      });

   }

});

module.exports = router;
