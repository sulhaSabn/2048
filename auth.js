const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TronWeb = require("tronweb");

const User = require("./User");

const router = express.Router();

const tronWeb = new TronWeb({
   fullHost:"https://api.trongrid.io"
});

router.post("/register",async(req,res)=>{

   try{

      const {username,password} = req.body;

      const exist = await User.findOne({username});

      if(exist){
         return res.json({
            message:"User Exists"
         });
      }

      const hashed = await bcrypt.hash(password,10);

      const wallet = await tronWeb.createAccount();

      const user = new User({

         username,

         password:hashed,

         walletAddress:wallet.address.base58,

         privateKey:wallet.privateKey

      });

      await user.save();

      res.json({
         message:"Registered",
         wallet:user.walletAddress
      });

   }catch(err){
      res.status(500).json({
         error:err.message
      });
   }

});

router.post("/login",async(req,res)=>{

   try{

      const {username,password} = req.body;

      const user = await User.findOne({username});

      if(!user){
         return res.json({
            message:"User Not Found"
         });
      }

      const valid = await bcrypt.compare(
         password,
         user.password
      );

      if(!valid){
         return res.json({
            message:"Wrong Password"
         });
      }

      const token = jwt.sign(
         {id:user._id},
         process.env.JWT_SECRET
      );

      res.json({
         token,
         user
      });

   }catch(err){
      res.status(500).json({
         error:err.message
      });
   }

});

module.exports = router;
