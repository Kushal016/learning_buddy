const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routers/userRoutes");
const hfRoutes = require("./routers/HF_Routes");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// Connect DB
connectDB();

//cors setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Routes
app.use("/api", userRoutes);
app.use("/api/hf", hfRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
