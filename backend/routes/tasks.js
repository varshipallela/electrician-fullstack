const express = require('express');
const router = express.Router();
const db = require('../db');

// Create Task
router.post('/', (req, res) => {
  const {
    customerName, contactNumber, taskType, quantity, modules,
    location, startTime, endTime, assignedTo
  } = req.body;

  const sql = `
    INSERT INTO tasks
    (customer_name, contact_number, task_type, quantity, modules,
     location, start_time, end_time, assigned_to)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    customerName, contactNumber, taskType, quantity,
    modules, location, startTime, endTime, assignedTo
  ], err => {
    if (err) return res.status(500).json({ message: 'Task creation failed' });
    res.status(201).json({ message: 'Task created' });
  });
});

// Get Tasks by User ID
router.get('/user/:id', (req, res) => {
  const sql = 'SELECT * FROM tasks WHERE assigned_to = ?';
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching tasks' });
    res.status(200).json(results);
  });
});

// Update Task Status
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
  db.query(sql, [status, req.params.id], err => {
    if (err) return res.status(500).json({ message: 'Status update failed' });
    res.status(200).json({ message: 'Task status updated' });
  });
});

module.exports = router;
