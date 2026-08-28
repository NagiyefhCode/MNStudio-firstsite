const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeBtn = document.getElementById("closeBtn");

contactBtn.addEventListener("click", function() {
    contactModal.style.display = "flex";
});

closeBtn.addEventListener("click", function() {
    contactModal.style.display = "none";
});

contactModal.addEventListener("click", function(event) {
    if (event.target === contactModal) {
        contactModal.style.display = "none";
    }
});