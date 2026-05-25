const express = require("express");

const User = require("./User");

const router = express.Router();

router.get("/",async(req,res)=>{

   try{

      const users = await User.find()
      .sort({bestScore:-1})
      .limit(50)
      .select(

         "username bestScore level coins"

      );

      res.json(users);

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.get("/top-levels",async(req,res)=>{

   try{

      const users = await User.find()
      .sort({level:-1})
      .limit(50)
      .select(

         "username level bestScore coins"

      );

      res.json(users);

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

module.exports = router;
