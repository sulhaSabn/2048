const express = require("express");

const User = require("./User");
const Transaction = require("./Transaction");

const router = express.Router();

const ADMIN_PASSWORD = "admin123";

router.post("/login",(req,res)=>{

   const {password} = req.body;

   if(password !== ADMIN_PASSWORD){

      return res.json({
         message:"Wrong Password"
      });

   }

   res.json({
      message:"Admin Login Success"
   });

});

router.get("/users",async(req,res)=>{

   try{

      const users = await User.find()
      .select("-password -privateKey");

      res.json(users);

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.get("/transactions",async(req,res)=>{

   try{

      const txs = await Transaction.find()
      .sort({createdAt:-1});

      res.json(txs);

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.post("/add-coins",async(req,res)=>{

   try{

      const {

         userId,
         coins

      } = req.body;

      const user =
      await User.findById(userId);

      if(!user){

         return res.json({
            message:"User Not Found"
         });

      }

      user.coins += Number(coins);

      await user.save();

      res.json({

         message:"Coins Added",

         coins:user.coins

      });

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.post("/ban-user",async(req,res)=>{

   try{

      const {userId} = req.body;

      await User.findByIdAndDelete(userId);

      res.json({
         message:"User Deleted"
      });

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

router.get("/stats",async(req,res)=>{

   try{

      const users =
      await User.countDocuments();

      const transactions =
      await Transaction.countDocuments();

      const txs =
      await Transaction.find();

      let totalDeposits = 0;

      txs.forEach(tx=>{

         totalDeposits += tx.amount;

      });

      res.json({

         totalUsers:users,

         totalTransactions:transactions,

         totalDeposits

      });

   }catch(err){

      res.status(500).json({
         error:err.message
      });

   }

});

module.exports = router;
