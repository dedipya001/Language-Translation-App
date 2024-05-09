(function(){
    emailjs.init("aoxgXslA0920sfsjj");
  })();

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    // Get form data
    const formData = {
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    // Send email using EmailJS
    emailjs.send("service_rwpgo3q", "template_2g4qt0l", formData)
        .then(function (response) {
            console.log('Email sent successfully:', response);
            alert('Email sent successfully!');
            
        }, function (error) {
            console.error('Error sending email:', error);
            alert('Error sending email. Please try again later.');
        });
});