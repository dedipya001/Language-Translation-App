const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()



// Load environment variables from .env file
// dotenv.config();

const app = express();
const port = process.env.PORT || 5007;
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API_KEY;
// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));
app.use(bodyParser.json());
app.use(express.json());

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
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
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

// Chatbot

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];


  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are chatUR, a friendly assistant who works for Linguist website. You helps people to know the meaning of different words in different indian languages an also helps to solve communication related queries. also help people to increase their communication skills\ngive short and simple responses\nonly give responses for language and communication related queries"}],
      },
      {
        role: "model",
        parts: [{ text: "Hi there! I'm chatUR, your friendly language guide. How can I help you today?"}],
      },
      {
        role: "user",
        parts: [{ text: "how shoul i greet someone in bengali"}],
      },
      {
        role: "model",
        parts: [{ text: "\"Nomoshkar\" is a respectful way to greet someone in Bengali."}],
      },
      {
        role: "user",
        parts: [{ text: "2+2="}],
      },
      {
        role: "model",
        parts: [{ text: "Sorry, I can only help with language and communication questions."}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

