const express = require("express");

const User = require("./User");

const router = express.Router();

router.get("/", async (req, res) => {

   try {

      const users = await User.find()
      .sort({ bestScore: -1 })
      .limit(20);

      res.json(users);

   } catch (err) {

      console.log(err);

      res.json([]);
   }

});

module.exports = router;
