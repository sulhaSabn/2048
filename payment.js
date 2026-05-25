const express = require("express");
const TronWeb = require("tronweb").default;

const User = require("./User");
const Transaction = require("./Transaction");

const router = express.Router();

const tronWeb = new TronWeb({
   fullHost: "https://api.trongrid.io"
});

router.post("/verify", async (req, res) => {

   try {

      const { txid, userId } = req.body;

      const user = await User.findById(userId);

      if (!user) {

         return res.json({
            success: false,
            message: "کاربر پیدا نشد"
         });

      }

      if (user.usedTxids.includes(txid)) {

         return res.json({
            success: false,
            message: "TXID تکراری"
         });

      }

      user.coins += 100;
      user.usdtBalance += 1;

      user.usedTxids.push(txid);

      await user.save();

      await Transaction.create({

         userId: user._id,

         txid,

         amount: 1,

         coins: 100,

         wallet: user.walletAddress

      });

      res.json({
         success: true,
         coins: user.coins
      });

   } catch (err) {

      console.log(err);

      res.json({
         success: false,
         message: "خطا"
      });

   }

});

module.exports = router;
