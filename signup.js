document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // 1️⃣ Empty field validation
        if (!fullName || !email || !username || !password || !confirmPassword) {
            alert("Please fill all the details");
            return;
        }

        // 2️⃣ Password match validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // 3️⃣ Get existing users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 4️⃣ Username uniqueness check
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            alert("Username already exists!");
            return;
        }

        // 5️⃣ Create user object
        const newUser = {
            fullName,
            email,
            username,
            password // ⚠ learning purpose only
        };

        // 6️⃣ Save user (REGISTER ONLY)
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // 7️⃣ Redirect to login page (NO auto-login)
        alert("Signup successful! Please log in.");
        window.location.href = "login.html";
    });

});
