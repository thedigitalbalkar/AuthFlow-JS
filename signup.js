// signup.js
document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const gmail = document.getElementById("gmail").value.trim();
        
if (!gmail.endsWith("@gmail.com")) {
alert("Your Gmail is incorrect");
return;
}
        
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!gmail || !username || !password || !confirmPassword) {
            alert("Please fill all the details");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.username === username)) {
            alert("Username already exists!");
            return;
        }

        const newUser = {
            fullName,
            gmail,
            username,
            password,
            role: "user",       // 🔒 default
            status: "active"
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! Please log in.");
        window.location.href = "login.html";
    });


});


