const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routers/userRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Connect DB
connectDB();

//cors setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
