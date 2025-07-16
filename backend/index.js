const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend API is working!');
});

// API routes
app.use('/api', authRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server running: http://localhost:${process.env.PORT}`);
});
