const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TronWeb = require("tronweb");

const User = require("./User");

const router = express.Router();

const tronWeb = new TronWeb({
   fullHost:"https://api.trongrid.io"
});

router.post("/register", async(req,res)=>{

   try{

      const {username,password} = req.body;

      const exists = await User.findOne({username});

      if(exists){
         return res.json({
            success:false,
            message:"نام کاربری وجود دارد"
         });
      }

      const wallet = await tronWeb.createAccount();

      const hashed = await bcrypt.hash(password,10);

      const user = await User.create({
         username,
         password:hashed,
         walletAddress:wallet.address.base58,
         privateKey:wallet.privateKey
      });

      res.json({
         success:true,
         wallet:user.walletAddress,
         message:"ثبت نام موفق"
      });

   }catch(err){

      res.json({
         success:false,
         message:"خطا"
      });

   }

});

router.post("/guest", async(req,res)=>{

   const guest = await User.create({
      guest:true,
      coins:20
   });

   res.json({
      success:true,
      user:guest
   });

});

router.post("/login", async(req,res)=>{

   const {username,password} = req.body;

   const user = await User.findOne({username});

   if(!user){
      return res.json({
         success:false,
         message:"کاربر پیدا نشد"
      });
   }

   const match = await bcrypt.compare(password,user.password);

   if(!match){
      return res.json({
         success:false,
         message:"رمز اشتباه است"
      });
   }

   const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET
   );

   res.json({
      success:true,
      token,
      user
   });

});

module.exports = router;
