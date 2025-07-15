const express = require('express');
const router = express.Router();
const db = require('../db');

// Signup
router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  if (!firstName || !lastName || !email || !password || !role)
    return res.status(400).json({ message: 'All fields required' });

  const check = 'SELECT * FROM users WHERE email = ?';
  db.query(check, [email], (err, rows) => {
    if (rows.length) return res.status(409).json({ message: 'Email already exists' });

    const insert = 'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(insert, [firstName, lastName, email, password, role], err => {
      if (err) return res.status(500).json({ message: 'Error saving user' });
      res.status(201).json({ message: 'User registered' });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json(results[0]);
  });
});

module.exports = router;




