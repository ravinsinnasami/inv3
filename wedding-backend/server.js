// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Create and initialize SQLite database
const db = new sqlite3.Database('./wishes.db', 
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
  (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database');
      // Create wishes table if it doesn't exist
      db.run(`
        CREATE TABLE IF NOT EXISTS wishes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    }
  }
);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'ok', message: 'API is working' });
});

// API Routes
// Get all wishes
app.get('/api/wishes', (req, res) => {
  console.log('GET /api/wishes request received');
  db.all('SELECT * FROM wishes ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    console.log(`Retrieved ${rows.length} wishes`);
    res.json(rows);
  });
});

// Update your delete and reset routes
app.delete('/delete-wishes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM wishes WHERE id = ?', [id]);
    res.status(200).json({ message: 'Wish deleted successfully' });
  } catch (error) {
    console.error('Error deleting wish:', error);
    res.status(500).json({ error: 'Failed to delete wish' });
  }
});

app.delete('/reset-wishes', async (req, res) => {
  try {
    await db.run('DELETE FROM wishes');
    res.status(200).json({ message: 'Wishes reset successfully' });
  } catch (error) {
    console.error('Error resetting wishes:', error);
    res.status(500).json({ error: 'Failed to reset wishes' });
  }
});


// Add a wish
app.post('/api/wishes', (req, res) => {
  console.log('POST /api/wishes request received', req.body);
  const { name, message } = req.body;
  
  if (!name || !message) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Name and message are required' });
  }
  
  const sql = 'INSERT INTO wishes (name, message) VALUES (?, ?)';
  db.run(sql, [name, message], function(err) {
    if (err) {
      console.error('Database error:', err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    
    console.log(`Added new wish with ID: ${this.lastID}`);
    db.get('SELECT * FROM wishes WHERE id = ?', [this.lastID], (err, row) => {
      if (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json(row);
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test API at: http://localhost:${PORT}/api/test`);
});