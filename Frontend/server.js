const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();
const port = 5007;

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname,'Public')));



// Connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dedipya03',
  database: 'language_translation'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database');
});

// Render index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'Public', 'index.html'));
});


// Route to handle saving ratings from users
app.post('/saveRating', (req, res) => {
  const { input_language, output_language, rating } = req.body;

  // Insert the rating data into the database
  const sql = `INSERT INTO language_ratings (input_language, output_language, rating) VALUES (?, ?, ?)`;
  connection.query(sql, [input_language, output_language, rating], (error, results) => {
    if (error) {
      console.error('Error saving rating:', error);
      res.status(500).json({ error: 'Error saving rating' });
      return;
    }
    console.log('Rating saved successfully');
    res.status(200).json({ message: 'Rating saved successfully' });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
