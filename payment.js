const express = require("express");
const TronWeb = require("tronweb");

const User = require("./User");
const Transaction = require("./Transaction");

const router = express.Router();

const tronWeb = new TronWeb({
   fullHost:"https://api.trongrid.io"
});

const OWNER_WALLET = "TDE8mMioHzXWff1bKfsVpc32AcnWrufPrB";

router.post("/verify", async(req,res)=>{

   try{

      const {txid,userId} = req.body;

      const user = await User.findById(userId);

      if(!user){
         return res.json({success:false});
      }

      if(user.usedTxids.includes(txid)){
         return res.json({
            success:false,
            message:"TXID قبلا استفاده شده"
         });
      }

      const tx = await tronWeb.trx.getTransactionInfo(txid);

      if(!tx){
         return res.json({
            success:false,
            message:"تراکنش پیدا نشد"
         });
      }

      const amountUSDT = 5;

      const coins = amountUSDT * 100;

      user.coins += coins;

      user.usedTxids.push(txid);

      await user.save();

      await Transaction.create({
         userId,
         txid,
         amount:amountUSDT,
         coins
      });

      res.json({
         success:true,
         coins
      });

   }catch(err){

      res.json({
         success:false,
         message:"خطا"
      });

   }

});

module.exports = router;
