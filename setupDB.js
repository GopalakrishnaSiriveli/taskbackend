const db = require('./db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS banner (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      timer INTEGER,
      link TEXT
    )
  `);

  // Insert default data
  db.run(`
    INSERT INTO banner (description, timer, link) VALUES
    ('Welcome to our website!', 60, 'https://example.com')
  `, (err) => {
    if (err) {
      console.error('Error inserting data', err.message);
    } else {
      console.log('Database setup complete.');
    }
  });

  db.close();
});
