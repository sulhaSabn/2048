const cron = require("node-cron");

cron.schedule("*/30 * * * * *", async()=>{

   console.log("Wallet Watcher Running");

});
