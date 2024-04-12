





































// document.addEventListener("DOMContentLoaded", function() {
//     const fileInput = document.getElementById("file");
//     const outputLanguageSelect = document.getElementById("output-language2");
//     const submitButton = document.getElementById("button-submit");
//     const previewContainer = document.getElementById("preview");
//     const apiResponseContainer = document.getElementById("api-response");
//     const downloadButton = document.getElementById("button-download");

//     submitButton.addEventListener("click", async function() {
//         const file = fileInput.files[0];
//         const outputLanguage = outputLanguageSelect.value;

//         if (!file) {
//             alert("Please select a file.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("language", outputLanguage);

//         try {
//             const response = await fetch("/translate", {
//                 method: "POST",
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error("Translation failed.");
//             }

//             const data = await response.json();
//             previewContainer.innerHTML = `<p>${data.translated_text}</p>`;
//             apiResponseContainer.innerText = "Translation Successful!";
//             downloadButton.style.display = "block";
//         } catch (error) {
//             console.error("Error:", error);
//             apiResponseContainer.innerText = "Translation Failed!";
//         }
//     });

//     downloadButton.addEventListener("click", async function() {
//         // Implement download functionality if needed
//     });
// });
