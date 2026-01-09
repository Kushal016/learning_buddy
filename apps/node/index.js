 const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routers/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
