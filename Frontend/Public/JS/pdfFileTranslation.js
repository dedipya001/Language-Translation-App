// // document.addEventListener('DOMContentLoaded', () => {
// //     const form = document.getElementById('translation-form');
// //     const button = document.getElementById('button-submit');

// //     form.addEventListener('submit', async (event) => {
// //         event.preventDefault();

// //         const form = new FormData();
// //         form.append('file', fileInputElement.files[0]);  // Assuming fileInputElement is the file input element
// //         form.append('output_language', selectedLanguage);  // Assuming selectedLanguage is the selected output language
        
// //         fetch('http://localhost:8000/upload/', {
// //             method: 'POST',
// //             body: form
// //         })
// //         .then(response => response.json())
// //         .then(data => console.log(data))
// //         .catch(error => console.error('Error:', error))
// //     })

// // });

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('translation-form');
//     const button = document.getElementById('button-submit');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         const formData = new FormData(form);
//         const responseContainer = document.getElementById('api-response');
//         const uploadMessage = document.getElementById('upload-message');
//         const translatePdf = document.getElementById('translate-pdf');
//         const successfulmsg = document.getElementById('successfulmsg');
//         try {
//             const response = await fetch('http://localhost:8000/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 successfulmsg.innerHTML = `<span>File Uploaded Successfully</span>`;
//                 uploadMessage.style.display = 'none';
//                 translatePdf.style.display = 'block';
//             } else {
//                 uploadMessage.innerHTML = '<span>Error uploading file</span>';
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             uploadMessage.innerHTML = '<span>Error uploading file</span>';
//         }
//     });
// });

//----------------------------------------------------------------------------------------------
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('translation-form');
//     const buttonSubmit = document.getElementById('button-submit');
//     const translatePdfButton = document.getElementById('translate-pdf');
//     const previewContainer = document.querySelector('.preview-container');
//     const previewText = document.querySelector('.preview span');
//     const fileInput = document.getElementById('file');
//     const fileUpload = document.getElementById('custum-file-upload');
    
//     fileInput.addEventListener('change', () => {
//         const file = fileInput.files[0];
//         if (file) {
//             previewText.textContent = `Preview of ${file.name}:`;
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const preview = document.createElement('embed');
//                 preview.setAttribute('src', event.target.result);
//                 preview.setAttribute('type', 'application/pdf');
//                 previewContainer.innerHTML = ''; // Clear previous preview
//                 previewContainer.appendChild(preview);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             previewText.textContent = 'The preview of the uploaded file will appear here:';
//             previewContainer.innerHTML = '';
//         }
//     });

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior
        
//         // Your form submission logic here
//         event.preventDefault(); // Prevent default form submission behavior
        
//         const formData = new FormData(form); // Get form data
        
//         try {
//             const response = await fetch('http://localhost:8000/upload', {
//                 method: 'POST',
//                 body: formData,
//                 // Add headers if needed
//             });
            
//             if (response.ok) {
//                 const data = await response.json();
//                 // Handle successful response
//                 $('#successfulmsg').html('<span>File Uploaded Successfully</span>');
//             } else {
//                 // Handle error response
//                 $('#upload-message').html('<span>Error uploading file</span>');
//             }
//         } catch (error) {
//             // Handle network error
//             console.error('Network error:', error);
//             $('#upload-message').html('<span>Error uploading file</span>');
//         }
        
//         // Change submit button to translate button
//         fileUpload.style.display = 'none';
//         buttonSubmit.style.display = 'none';
//         translatePdfButton.style.display = 'block';
//     });
// });


//================================================================================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('translation-form');
    const buttonSubmit = document.getElementById('button-submit');
    const translatePdfButton = document.getElementById('translate-pdf');
    const uploadMessage = document.getElementById('upload-message');
    const successfulMsg = document.getElementById('successfulmsg');
    const fileInput = document.getElementById('file');
    const fileNameDisplay = document.getElementById('file-name-display');
    const fileUpload = document.getElementById('custum-file-upload');
    
    
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            uploadMessage.style.display = 'none'; // Hide upload message
            fileNameDisplay.style.display = 'block'; // Show file name display box
        } else {
            fileNameDisplay.textContent = ''; // Clear file name display
            fileNameDisplay.style.display = 'none'; // Hide file name display box
            uploadMessage.style.display = 'block'; // Show upload message
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        
        const formData = new FormData(form); // Get form data
        
        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData,
                // Add headers if needed
            });
            
            if (response.ok) {
                const data = await response.json();
                successfulMsg.innerHTML = '<span>File Uploaded Successfully</span>';
            } else {
                uploadMessage.innerHTML = '<span>Error uploading file</span>';
            }
        } catch (error) {
            console.error('Network error:', error);
            uploadMessage.innerHTML = '<span>Error uploading file</span>';
        }
        
        // Change submit button to translate button
        fileUpload.style.display = 'none';
        buttonSubmit.style.display = 'none';
        translatePdfButton.style.display = 'block';
    });
});
