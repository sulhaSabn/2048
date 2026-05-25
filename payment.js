const express = require("express");
const User = require("./User");

const router = express.Router();

router.post("/buy-skin", async(req,res)=>{

   const {userId,skin} = req.body;

   const user = await User.findById(userId);

   if(user.coins < 500){

      return res.json({
         success:false,
         message:"سکه کافی نیست"
      });

   }

   user.coins -= 500;

   user.skins.push(skin);

   await user.save();

   res.json({
      success:true,
      skins:user.skins
   });

});

module.exports = router;
