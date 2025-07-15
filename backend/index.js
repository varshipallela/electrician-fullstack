// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api', authRoutes);
// app.use('/api/tasks', taskRoutes);

// app.listen(process.env.PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
// );
// index.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api', authRoutes);

// app.listen(process.env.PORT, () => {
//   console.log(`http://localhost:${process.env.PORT}`);
//   app.get('/', (req, res) => {
//   res.send('Backend API is working!');
// });

// });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('✅ Backend API is working!');
});

app.use('/api', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
