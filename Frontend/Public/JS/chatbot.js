// const { getEnabledCategories } = require("trace_events");






const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const form = document.getElementById('chat-form');


const chatur = document.getElementById('chatur');
const chatcontainer = document.getElementById('chat-container');



chatur.addEventListener('click', () => {
  if (chatcontainer.style.display === 'none' || chatcontainer.style.display === '') {
    chatcontainer.style.display = "block";
  } else {
    chatcontainer.style.display = "none";
  }
});


async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;
  userInput.value = ''; // Clear input field
  console.log(userMessage)

  // const loader = document.querySelector('.botloader');
  // const loader = document.createElement('div');


  chatHistory.innerHTML += `<div class="user-message">${userMessage}</div>`;
  chatHistory.scrollTop = chatHistory.scrollHeight;
  

  const loader = document.createElement('div');
  loader.classList.add("botloader");
  loader.innerHTML += `
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
`;
chatHistory.appendChild(loader);
chatHistory.scrollTop = chatHistory.scrollHeight;

  // loader.style.display = 'flex';
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

    // loader.style.display="none";
    loader.remove();

    chatHistory.innerHTML += `<div class="bot-message">${botMessage}</div>`;

    
    chatHistory.scrollTop = chatHistory.scrollHeight;
  } catch (error) {
    console.error('Error:', error);
    // loader.style.display="none";
    loader.remove();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission
  // const loader = document.getElementById('botloader');
  // loader.style.display = 'flex'; // Show the loader
  sendMessage().finally(() => {
  // loader.style.display = 'none'; // Hide the loader
  });;
});

// document.addEventListener('DOMContentLoaded', function () {
//   const chatHistory = document.getElementById('chat-history');
//   const userInput = document.getElementById('user-input');
//   const form = document.getElementById('chat-form');

//   let messageCount = 0; // Track message count

//   async function sendMessage() {
//     const userMessage = userInput.value;
//     userInput.value = ''; // Clear input field

//     // Determine alignment based on message count
//     // const alignment = (messageCount === 0 || messageCount % 2 === 0) ? 'right' : 'left';

//     // Create message element
//     const messageElement = document.createElement('div');
//     messageElement.textContent = userMessage;
//     messageElement.classList.add(alignment === 'right' ? 'user-message-right' : 'user-message-left');

//     // Add message to the chat history
//     chatHistory.appendChild(messageElement);

//     // Scroll to the bottom of the chat history
//     chatHistory.scrollTop = chatHistory.scrollHeight;

//     messageCount++; // Increment message count
//   }

//   form.addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent form submission
//     sendMessage();
//   });
// });