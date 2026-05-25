const express = require("express");
const User = require("./User");

const router = express.Router();

router.post("/save", async(req,res)=>{

   try{

      const {
         userId,
         level,
         score,
         bestScore,
         coins
      } = req.body;

      await User.findByIdAndUpdate(userId,{
         level,
         score,
         bestScore,
         coins
      });

      res.json({success:true});

   }catch(err){

      res.json({success:false});

   }

});

module.exports = router;
