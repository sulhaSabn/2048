const TronWeb = require("tronweb");

const User = require("./User");
const Transaction = require("./Transaction");

const tronWeb = new TronWeb({
   fullHost:"https://api.trongrid.io"
});

async function checkPayments(){

   const users = await User.find();

   for(const user of users){

      try{

         const txs = await tronWeb.trx.getTransactionsRelated(
            user.walletAddress,
            "to"
         );

         for(const tx of txs){

            const txid = tx.txID;

            if(user.usedTxids.includes(txid)){
               continue;
            }

            const amount =
            tx.raw_data.contract[0].parameter.value.amount
            /1000000;

            if(amount <= 0){
               continue;
            }

            const coins = amount * 50;

            user.coins += coins;

            user.usedTxids.push(txid);

            await user.save();

            await Transaction.create({

               userId:user._id,

               txid,

               amount,

               coins,

               wallet:user.walletAddress

            });

            console.log(
               "Payment Received",
               user.username,
               amount
            );

         }

      }catch(err){
         console.log(err.message);
      }

   }

}

setInterval(checkPayments,30000);
