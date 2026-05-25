const express = require("express");
const User = require("./User");

const router = express.Router();

router.get("/", async(req,res)=>{

   const users = await User
   .find({guest:false})
   .sort({bestScore:-1})
   .limit(50);

   res.json(users);

});

module.exports = router;
