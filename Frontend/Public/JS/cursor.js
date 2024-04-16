document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.querySelector('.cursor');

    function updateCursorPosition(e) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";
    }

    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("scroll", updateCursorPosition);


    document.addEventListener("mouseover", function(e) {
        if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") {
            cursor.classList.add('active');
            // cursor.style.width = "100px";
            // cursor.style.height = "100px";
            // cursor.style.borderRadius = "50%";
            // cursor.style.transform = "translate(-50%, -50%)";
        } else {
            cursor.classList.remove('active');
            // cursor.style.width = "20px";
            // cursor.style.height = "20px";
            // cursor.style.borderRadius = "50%";
            // cursor.style.transform = "translate(-50%, -50%)";
        }
    });

    document.addEventListener("click", function() {
        cursor.classList.add('active');
        setTimeout(function() {
            cursor.classList.remove('active');
        }, 200);
    });
});
