window.addEventListener("load", function () {
  const loader = document.getElementById("loadingWave");
  const content = document.getElementById("content");

  // Show the loader
  loader.style.display = "flex";

  // After 3 seconds, hide the loader and show the content
  setTimeout(function () {
    loader.style.display = "none";
    content.style.display = "block"; // Show the content after loader hides
  }, 3000);
  
});

//background animation
gsap.to(".background-image", {
  x: "-=90",
  y: "-=90",
  duration: 100,
  repeat: -1,
  ease: "linear",
});

function toggleDropdown(event) {
  event.preventDefault();
  const dropdownContent = event.target.nextElementSibling;
  dropdownContent.classList.toggle("show");
}

document.addEventListener("click", function (event) {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    if (!dropdown.contains(event.target)) {
      dropdownContent.classList.remove("show");
    }
  });
});

window.addEventListener("load", function () {
  const loader = document.getElementById("loadingWave");
  // const content = document.getElementById("content");
  const homeDiv = document.getElementById("home");
  const welcome=document.getElementById("welcome")
  // Show the loader
  loader.style.display = "flex";
  
  welcome.style.display='none';
  
 
  // After 3 seconds, hide the loader and show the content
  setTimeout(function () {
    loader.style.display = "none";
    // home.style.display = "block"; // Show the content after loader hides
    // welcome.style.display="block";
    // Rocket animation on page load
    gsap.to(".rocket", {
      duration: 2.5,
      y: -window.innerHeight,
      opacity: 0,
      ease: "power1.inOut",
      onComplete: function() {
        welcome.style.display="block";
        // After rocket flies off the screen, animate home div
        gsap.fromTo(homeDiv, { scale: 1 }, { scale: 1.5, duration: 0.3, ease: "power1.inOut", onComplete: function() {
          gsap.to(homeDiv, { scale: 1, duration: 0.3, ease: "power1.inOut" });
        }});        
      }
    });
  }, 3000);
});

//-------

// Get the switch input element
const switchInput = document.querySelector(".switch__input");

// Get the text elements
const textOption1 = document.querySelector(".option1 p");
const textOption2 = document.querySelector(".option2 p");

// Add event listener for switch change
switchInput.addEventListener("change", function () {
  // Check if the switch is checked
  if (this.checked) {
    // Switch is on, change the color of textOption2
    textOption2.style.color = "#007bff";
    // Reset the color of textOption1
    textOption1.style.color = "#fff";
  } else {
    // Switch is off, change the color of textOption1
    textOption1.style.color = "#007bff";
    // Reset the color of textOption2
    textOption2.style.color = "#fff";
  }
});

//smooth scrolling

function smoothScroll(target) {
  const element = document.querySelector(target);
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth", // This triggers smooth scrolling animation
  });
}

//Translation
document
  .getElementById("transcontainer")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const inputText = document.getElementById("input-text").value;
    const inputLanguage = document.getElementById("input-language").value;
    const outputLanguage = document.getElementById("output-language").value;

    // Ensure input language is selected
    if (!inputLanguage) {
      console.error("Please select an input language.");
      return;
    }

    // Check if source and target languages are the same
    if (inputLanguage === outputLanguage) {
      // Display input text in output box with message in next line
      document.getElementById("output-text").textContent =
        inputText + "\n(input and output languages are the same)";
      return;
    }

    const requestBody = {
      text: inputText,
      source_language: inputLanguage,
      target_language: outputLanguage,
    };

    try {
      const response = await fetch("http://localhost:8000/translate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Translation request failed.");
      }

      const translatedText = await response.json();
      document.getElementById("output-text").textContent = translatedText[0];
      setTimeout(showPopup, 5000); // Show popup after 1 second delay
    } catch (error) {
      console.error("Translation error:", error);
      document.getElementById("output-text").textContent =
        "Translation failed.";
    }
  });

// Function to display the pop-up dialog box
function showPopup() {
  const popup = document.querySelector(".popup");
  popup.style.display = "block";
}

// Event listener for the close button of the popup
document.querySelector(".close-btn").addEventListener("click", function () {
  const popup = document.querySelector(".popup");
  popup.style.display = "none";
});

const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {
  star.addEventListener("click", function () {
    const inputLanguageElement = document.getElementById("input-language");
    const inputLanguage = inputLanguageElement.value;

    const outputLanguageElement = document.getElementById("output-language");
    const outputLanguage = outputLanguageElement.value;
    const ratingValue = 5 - index;
    console.log("Star selected:", index + 1, "Rating:", ratingValue);
    console.log(
      "Input Language:",
      inputLanguage,
      "Output Language:",
      outputLanguage
    );
    // Send the rating to the server
    fetch("/save-ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputLanguage: inputLanguage, // Replace inputLanguage with your actual value
        outputLanguage: outputLanguage, // Replace outputLanguage with your actual value
        rating: ratingValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Rating saved successfully:", data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });

    const feedbackPopup = document.querySelector(".popup");
    gsap.to(feedbackPopup, {
      autoAlpha: 0,
      duration: 2.1,
      onComplete: function () {
        feedbackPopup.style.display = "none";
      },
    });
  });
});

const stars2 = document.querySelectorAll(".s");

stars2.forEach((star, index) => {
  star.addEventListener("click", function () {
    const ratingValue = 5 - index;

    console.log("Star selected:", index + 1, "Rating:", ratingValue);
  });
});

//scrollbar

// // GSAP Animation
gsap.to(".gsap-scrollbar-animation::-webkit-scrollbar-thumb", {
  background: "#ff9900", // Change to different color
  duration: 2,
  repeat: -1,
  yoyo: true, // Alternate animation
});

//toggle switch
document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector(".switch__input");
  var translationContainer = document.querySelector(".translationcontainer");
  var textTranslationForm = document.querySelector(".texttranslation");
  var textFileTranslationForm = document.querySelector(".textfiletranslation");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      translationContainer.classList.add("translation-flipped");
      textTranslationForm.style.display = "none";
      textFileTranslationForm.style.display = "flex";
    } else {
      translationContainer.classList.remove("translation-flipped");
      textTranslationForm.style.display = "block";
      textFileTranslationForm.style.display = "none";
    }
  });
});

const checkbox = document.querySelector(".switch__input");
const translationCard = document.querySelector(".translation-card");
const textfiletranslation = document.querySelector(".textfiletranslation");

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    gsap.set(textfiletranslation, { rotationY: 0 }); // Reset rotation
    gsap.to(textfiletranslation, {
      duration: 1,
      rotationY: 360,
      ease: "linear",
    }); // Flip the card when checked
  } else {
    gsap.set(translationCard, { rotationY: 0 }); // Reset rotation
    gsap.to(translationCard, { duration: 1, rotationY: 360, ease: "linear" }); // Flip the card back when unchecked
  }
});

const apiresponse = document.getElementById("api-response-container");
const apibutton = document.getElementById("button-submit");
const downloadbutton = document.getElementById("downloadbutton");
apibutton.addEventListener("click", function () {
  apiresponse.style.display = "block";
  downloadbutton.style.display = "flex";
});

function download() {
  // Assuming 'textfile.txt' is the file you want to download
  // You need to replace 'textfile.txt' with the actual file path
  window.location.href = "textfile.txt";
}
