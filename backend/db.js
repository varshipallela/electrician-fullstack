const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
    process.exit(1); // Stop the app if DB is not connected
  } else {
    console.log('✅ MySQL connected successfully');
  }
});

module.exports = db;
