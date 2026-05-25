const express = require("express");

const User = require("./User");

const router = express.Router();

router.post("/save-score", async (req, res) => {

   try {

      const { userId, score } = req.body;

      const user = await User.findById(userId);

      if (!user) {

         return res.json({
            success: false
         });

      }

      user.score = score;

      if (score > user.bestScore) {
         user.bestScore = score;
      }

      await user.save();

      res.json({
         success: true
      });

   } catch (err) {

      console.log(err);

      res.json({
         success: false
      });

   }

});

module.exports = router;
