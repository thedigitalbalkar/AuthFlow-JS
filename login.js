document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.getElementById("signinBtn");

    loginBtn.addEventListener("click", function () {

        const inputValue = document.getElementById("gmail").value.trim(); // username OR email
        const password = document.getElementById("password").value.trim();

        // 1️⃣ Empty field validation
        if (!inputValue || !password) {
            alert("Please enter username/email and password");
            return;
        }

        // 2️⃣ Get registered users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 3️⃣ Find matching user
        const matchedUser = users.find(user =>
            (user.username === inputValue || user.email === inputValue) &&
            user.password === password
        );

        // 4️⃣ If user not found
        if (!matchedUser) {
            alert("Invalid login credentials");
            return;
        }

        // 5️⃣ Login success → create session
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

        // 6️⃣ Redirect to home page
        window.location.href = "index.html";
    });

});