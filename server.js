require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./auth");
const paymentRoutes = require("./payment");
const leaderboardRoutes = require("./leaderboard");
const gameRoutes = require("./game");

require("./walletWatcher");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
   console.log("MongoDB Connected");
})
.catch(err=>{
   console.log(err);
});

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/game", gameRoutes);

app.get("/", (req,res)=>{
   res.send("GameFi 2048 Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
   console.log("Server Running On Port", PORT);
});
