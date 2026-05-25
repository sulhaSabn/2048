const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");

const router = express.Router();

router.post("/register", async(req,res)=>{

   try{

      const {username,password} = req.body;

      const exists = await User.findOne({username});

      if(exists){
         return res.json({success:false,message:"نام کاربری وجود دارد"});
      }

      const hashed = await bcrypt.hash(password,10);

      const user = await User.create({
         username,
         password:hashed
      });

      res.json({success:true,user});

   }catch(err){
      res.json({success:false});
   }

});

router.post("/login", async(req,res)=>{

   const {username,password} = req.body;

   const user = await User.findOne({username});

   if(!user){
      return res.json({success:false});
   }

   const match = await bcrypt.compare(password,user.password);

   if(!match){
      return res.json({success:false});
   }

   const token = jwt.sign({id:user._id},"SECRETKEY");

   res.json({
      success:true,
      token,
      user
   });

});

module.exports = router;
