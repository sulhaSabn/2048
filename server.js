require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./auth");
const gameRoutes = require("./game");
const paymentRoutes = require("./payment");
const leaderboardRoutes = require("./leaderboard");

require("./walletWatcher");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"));

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.listen(process.env.PORT,()=>{
   console.log("Server Running");
});
