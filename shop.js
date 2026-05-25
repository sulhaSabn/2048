const express = require("express");

const User = require("./User");

const router = express.Router();

router.post("/buy-undo",async(req,res)=>{

   const {userId} = req.body;

   const user = await User.findById(userId);

   if(user.coins < 50){
      return res.json({
         message:"Not Enough Coins"
      });
   }

   user.coins -= 50;

   user.undoCount += 1;

   await user.save();

   res.json({
      message:"Undo Purchased",
      user
   });

});

router.post("/buy-bomb",async(req,res)=>{

   const {userId} = req.body;

   const user = await User.findById(userId);

   if(user.coins < 120){
      return res.json({
         message:"Not Enough Coins"
      });
   }

   user.coins -= 120;

   user.bombCount += 1;

   await user.save();

   res.json({
      message:"Bomb Purchased",
      user
   });

});

module.exports = router;
