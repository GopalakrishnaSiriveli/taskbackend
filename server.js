const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Get banner details
app.get('/api/banner', (req, res) => {
  db.get('SELECT * FROM banner ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Update banner details
app.post('/api/banner', (req, res) => {
  const { description, timer, link } = req.body;
  db.run(
    `UPDATE banner SET description = ?, timer = ?, link = ? WHERE id = (SELECT MAX(id) FROM banner)`,
    [description, timer, link],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Banner updated successfully!' });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
