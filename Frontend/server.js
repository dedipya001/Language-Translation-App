const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 5007;

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname,'Public')));
app.use(bodyParser.json());

// Connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dedipya03',
  database: 'language_translation'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Render index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'Public', 'index.html'));
});

// Save ratings to the database
app.post('/save-ratings', (req, res) => {
  const { inputLanguage, outputLanguage, rating } = req.body;

  const sql = 'INSERT INTO language_ratings (input_language, output_language, rating) VALUES (?, ?, ?)';
  connection.query(sql, [inputLanguage, outputLanguage, rating], (err, result) => {
    if (err) {
      console.error('Error saving rating: ' + err.stack);
      res.status(500).send('Error saving rating');
      return;
    }
    console.log('Rating saved successfully');
    res.status(200).send('Rating saved successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
