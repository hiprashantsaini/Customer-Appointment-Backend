const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();


const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(503).json({ success: false, message: "Database connection unavailable" });
  }
});
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});