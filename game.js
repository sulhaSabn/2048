const express = require("express");
const User = require("./User");

const router = express.Router();

router.post("/save", async(req,res)=>{

   const {
      userId,
      score,
      level,
      coins
   } = req.body;

   const user = await User.findById(userId);

   if(!user || user.guest){
      return res.json({
         success:false,
         message:"کاربر مهمان ذخیره ندارد"
      });
   }

   user.score = score;
   user.level = level;
   user.coins = coins;

   if(score > user.bestScore){
      user.bestScore = score;
   }

   await user.save();

   res.json({success:true});

});

router.post("/convert-score", async(req,res)=>{

   const {userId} = req.body;

   const user = await User.findById(userId);

   const reward = Math.floor(user.bestScore / 10000);

   if(reward <= 0){
      return res.json({
         success:false,
         message:"امتیاز کافی نیست"
      });
   }

   user.usdtBalance += reward;

   user.bestScore = 0;

   await user.save();

   res.json({
      success:true,
      usdt:reward
   });

});

module.exports = router;
