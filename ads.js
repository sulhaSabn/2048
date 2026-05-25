const express = require("express");

const User = require("./User");

const router = express.Router();

router.post("/reward",async(req,res)=>{

   const {userId} = req.body;

   const user = await User.findById(userId);

   user.coins += 20;

   await user.save();

   res.json({
      message:"Reward Added",
      coins:user.coins
   });

});

module.exports = router;
