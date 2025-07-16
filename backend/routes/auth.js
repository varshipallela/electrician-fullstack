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

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found. Please sign up first.' });

    const user = results[0];

    // Compare entered password with hashed password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    // Success
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role
        
      }
    });
  });
});

module.exports = router;




