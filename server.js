require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./auth");
const gameRoutes = require("./game");
const paymentRoutes = require("./payment");
const leaderboardRoutes = require("./leaderboard");
const shopRoutes = require("./shop");
const adsRoutes = require("./ads");
const adminRoutes = require("./admin");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {

   console.log("MongoDB Connected");

})
.catch(err => {

   console.log(err);

});

app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/payment", paymentRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/shop", shopRoutes);
app.use("/ads", adsRoutes);
app.use("/admin", adminRoutes);

require("./walletWatcher");

app.get("/", (req, res) => {

   res.send("2048 Backend Running");

});

app.listen(process.env.PORT || 3000, () => {

   console.log("Server Running");

});
