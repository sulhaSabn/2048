const cron = require("node-cron");
const User = require("./User");

cron.schedule("*/30 * * * * *", async()=>{

   const users = await User.find({guest:false});

   for(const user of users){

      console.log("Checking wallet:", user.walletAddress);

      // بررسی تراکنش USDT
      // افزایش سکه خودکار

   }

});
