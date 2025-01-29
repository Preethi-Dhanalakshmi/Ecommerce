// signin page
const username = "user";
const password = "key";

let emailId = document.getElementById("email");
let passCode = document.getElementById("passcode");
let note = document.querySelector(".empty");
let form = document.getElementById("sign");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailId.value;
    const pass = passCode.value;

    if (!email || !pass) {
        note.textContent = "Please fill in both email and password.";
    } else if (email === username && pass === password) {
        alert("Sign in successfully");
        window.location.href = "index.html"; // Redirect to home page
    } else {
        note.textContent = "Incorrect Email or Password. Please try again.";
    }
});

