
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
  app.get('/', (req, res) => {
  res.send('Backend API is working!');
});

});
