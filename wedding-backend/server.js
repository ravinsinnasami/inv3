// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: '*', // In production, replace with your specific domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Create and initialize SQLite database
const db = new sqlite3.Database('./wishes.db', (err) => {
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
});

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

// Reset all wishes - You should protect this route in production!
app.delete('/api/wishes/reset', (req, res) => {
  console.log('DELETE /api/wishes/reset request received');
  
  db.run('DELETE FROM wishes', function(err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    
    console.log(`Deleted all wishes. Rows affected: ${this.changes}`);
    res.json({ message: 'All wishes have been deleted', count: this.changes });
  });
});

// Delete a specific wish by ID
app.delete('/api/wishes/:id', (req, res) => {
  const wishId = req.params.id;
  console.log(`DELETE /api/wishes/${wishId} request received`);
  
  db.run('DELETE FROM wishes WHERE id = ?', [wishId], function(err) {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Wish not found' });
    }
    
    console.log(`Deleted wish with ID: ${wishId}`);
    res.json({ message: `Wish ${wishId} has been deleted` });
  });
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