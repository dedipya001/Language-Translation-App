// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('translation-form');
//     const button = document.getElementById('button-submit');

//     form.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const form = new FormData();
//         form.append('file', fileInputElement.files[0]);  // Assuming fileInputElement is the file input element
//         form.append('output_language', selectedLanguage);  // Assuming selectedLanguage is the selected output language
        
//         fetch('http://localhost:8000/upload/', {
//             method: 'POST',
//             body: form
//         })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error('Error:', error))
//     })

// });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('translation-form');
    const button = document.getElementById('button-submit');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(form);
        const responseContainer = document.getElementById('api-response');

        try {
            const response = await fetch('http://localhost:8000/upload/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                responseContainer.innerHTML = `<span>${data.message}</span>`;
            } else {
                responseContainer.innerHTML = '<span>Error uploading file</span>';
            }
        } catch (error) {
            console.error('Error:', error);
            responseContainer.innerHTML = '<span>Error uploading file</span>';
        }
    });
});
