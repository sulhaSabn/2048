const express = require("express");

const User = require("./User");

const router = express.Router();

const LEVELS = {

   1:500,
   2:1500,
   3:3000,
   4:6000,
   5:12000

};

router.post("/save-score",async(req,res)=>{

   try{

      const {

         userId,
         score

      } = req.body;

      const user = await User.findById(userId);

      if(!user){

         return res.json({
            message:"User Not Found"
         });

      }

      user.score = score;

      if(score > user.bestScore){

         user.bestScore = score;

      }

      const nextLevelScore =
      LEVELS[user.level] || 20000;

      if(score >= nextLevelScore){

         user.level += 1;

      }

      await user.save();

      res.json({

         message:"Score Saved",

         level:user.level,

         bestScore:user.bestScore,

         score:user.score

      });

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.post("/game-over",async(req,res)=>{

   try{

      const {

         userId,
         score

      } = req.body;

      const user = await User.findById(userId);

      if(!user){

         return res.json({
            message:"User Not Found"
         });

      }

      const needed =
      LEVELS[user.level] || 20000;

      let passed = false;

      if(score >= needed){

         user.level += 1;

         passed = true;

      }

      user.score = 0;

      await user.save();

      res.json({

         gameOver:true,

         passed,

         currentLevel:user.level,

         neededScore:needed

      });

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.post("/use-undo",async(req,res)=>{

   try{

      const {userId} = req.body;

      const user = await User.findById(userId);

      if(user.undoCount <= 0){

         return res.json({
            message:"No Undo Left"
         });

      }

      user.undoCount -= 1;

      await user.save();

      res.json({

         message:"Undo Used",

         undoLeft:user.undoCount

      });

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.post("/use-bomb",async(req,res)=>{

   try{

      const {userId} = req.body;

      const user = await User.findById(userId);

      if(user.bombCount <= 0){

         return res.json({
            message:"No Bomb Left"
         });

      }

      user.bombCount -= 1;

      await user.save();

      res.json({

         message:"Bomb Used",

         bombLeft:user.bombCount

      });

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.get("/profile/:id",async(req,res)=>{

   try{

      const user =
      await User.findById(req.params.id)
      .select("-password -privateKey");

      res.json(user);

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

module.exports = router;
