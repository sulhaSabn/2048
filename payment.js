const express = require("express");
const { TronWeb } = require("tronweb");

const User = require("./User");
const Transaction = require("./Transaction");

const router = express.Router();

const tronWeb = new TronWeb({
   fullHost: "https://api.trongrid.io"
});

router.post("/check", async (req, res) => {

   try {

      const { userId } = req.body;

      const user = await User.findById(userId);

      if (!user) {

         return res.json({
            message: "User Not Found"
         });

      }

      const txs =
      await tronWeb.trx.getTransactionsRelated(
         user.walletAddress,
         "to"
      );

      let addedCoins = 0;

      for (const tx of txs) {

         try {

            const txid = tx.txID;

            if (user.usedTxids.includes(txid)) {
               continue;
            }

            const amount =
            tx.raw_data.contract[0]
            .parameter.value.amount / 1000000;

            if (amount <= 0) {
               continue;
            }

            const coins = amount * 50;

            user.coins += coins;

            addedCoins += coins;

            user.usedTxids.push(txid);

            await Transaction.create({

               userId: user._id,

               txid,

               amount,

               coins,

               wallet: user.walletAddress

            });

         } catch (e) {

            console.log(e.message);

         }

      }

      await user.save();

      res.json({

         message: "Checked",

         addedCoins,

         totalCoins: user.coins

      });

   } catch (err) {

      res.status(500).json({
         error: err.message
      });

   }

});

module.exports = router;
