// const { getEnabledCategories } = require("trace_events");

const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const form = document.getElementById('chat-form');

async function sendMessage() {
  const userMessage = userInput.value;
  userInput.value = ''; // Clear input field
  console.log(userMessage)
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: userMessage }),
    });

    const data = await response.json();
    console.log(data)
    const botMessage = data.response;
    console.log(botMessage)
    // Add chat message to the chat history
    chatHistory.innerHTML += `<div class="user-message">${userMessage}</div>`;
    chatHistory.innerHTML += `<div class="bot-message">${botMessage}</div>`;

    // Scroll to the bottom of the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;
  } catch (error) {
    console.error('Error:', error);
    // Handle errors gracefully, e.g., display an error message to the user
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  // const loader = document.getElementById('loader');
  // loader.style.display = 'block'; // Show the loader
  sendMessage().finally(() => {
    // loader.style.display = 'none'; // Hide the loader after the message is sent
  });;
});

document.addEventListener('DOMContentLoaded', function () {
  const chatHistory = document.getElementById('chat-history');
  const userInput = document.getElementById('user-input');
  const form = document.getElementById('chat-form');

  let messageCount = 0; // Track message count

  async function sendMessage() {
    const userMessage = userInput.value;
    userInput.value = ''; // Clear input field

    // Determine alignment based on message count
    const alignment = (messageCount === 0 || messageCount % 2 === 0) ? 'right' : 'left';

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.textContent = userMessage;
    messageElement.classList.add(alignment === 'right' ? 'user-message-right' : 'user-message-left');

    // Add message to the chat history
    chatHistory.appendChild(messageElement);

    // Scroll to the bottom of the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;

    messageCount++; // Increment message count
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    sendMessage();
  });
});



const chatur = document.getElementById('chatur');
const chatcontainer = document.getElementById('chat-container');

chatur.addEventListener('click', () => {
  if (chatcontainer.style.display == 'none') {
    chatcontainer.style.display = "block";
  } 
  else
  {
    chatcontainer.style.display = "none";
  }
});
