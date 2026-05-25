const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const TronWeb = require("tronweb");

const User = require("./User");

const router = express.Router();

const tronWeb = new TronWeb({
   fullHost: "https://api.trongrid.io"
});

router.post("/register", async (req, res) => {

   try {

      const { username, password } = req.body;

      const exists = await User.findOne({ username });

      if (exists) {

         return res.json({
            success: false,
            message: "نام کاربری وجود دارد"
         });

      }

      const wallet = await tronWeb.createAccount();

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({

         username,

         password: hashed,

         walletAddress: wallet.address.base58,

         privateKey: wallet.privateKey

      });

      res.json({

         success: true,

         wallet: user.walletAddress

      });

   } catch (err) {

      console.log(err);

      res.json({

         success: false,

         message: "خطا"

      });

   }

});

module.exports = router;
