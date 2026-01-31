// // signup.js
// document.addEventListener("DOMContentLoaded", function () {

//     const signupForm = document.getElementById("signupForm");

//     const emailInput = document.getElementById("email");
//     const emailError = document.getElementById("emailError");

//     /* ================= EMAIL VALIDATION ================= */

//     function isValidEmail(email) {
//         // Gmail only
//         return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
//     }

//     // Live validation (runs while typing)
//     emailInput.addEventListener("input", () => {
//         if (isValidEmail(emailInput.value.trim())) {
//             emailError.style.display = "none";
//             emailInput.classList.remove("input-error");
//         }
//     });

//     /* ================= SIGNUP SUBMIT ================= */

//     signupForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//         const fullName = document.getElementById("fullName").value.trim();
//         const email = emailInput.value.trim();
//         const username = document.getElementById("username").value.trim();
//         const password = document.getElementById("password").value.trim();
//         const confirmPassword = document.getElementById("confirmPassword").value.trim();

//         // Required fields
//         if (!fullName || !email || !username || !password || !confirmPassword) {
//             alert("Please fill all the details");
//             return;
//         }

//         // Gmail validation
//         if (!isValidEmail(email)) {
//             emailError.style.display = "block";
//             emailInput.classList.add("input-error");
//             return; // ⛔ stop signup
//         }

//         // Password match
//         if (password !== confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }

//         const users = JSON.parse(localStorage.getItem("users")) || [];

//         // Duplicate check (username + email)
//         const exists = users.some(
//             user => user.username === username || user.email === email
//         );

//         if (exists) {
//             alert("Username or email already exists!");
//             return;
//         }

//         /* ================= CREATE USER ================= */

//         const newUser = {
//             fullName,
//             email,
//             username,
//             password,
//             role: "user",
//             status: "active"
//         };

//         users.push(newUser);
//         localStorage.setItem("users", JSON.stringify(users));

//         alert("Signup successful! Please log in.");
//         window.location.href = "login.html";
//     });

// });

// signup.js
document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    /* ================= EMAIL VALIDATION ================= */

    function isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    }

    // Live validation (same as admin)
    emailInput.addEventListener("input", function () {
        if (isValidEmail(emailInput.value.trim())) {
            emailError.style.display = "none";
            emailInput.classList.remove("input-error");
        }
    });

    /* ================= SIGNUP SUBMIT ================= */

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = emailInput.value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Required fields
        if (!fullName || !email || !username || !password || !confirmPassword) {
            alert("Please fill all the details");
            return;
        }

        // Gmail validation (same logic as admin)
        if (!isValidEmail(email)) {
            emailError.style.display = "block";
            emailInput.classList.add("input-error");
            return;
        }

        // Password match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Duplicate check
        const exists = users.some(
            user => user.username === username || user.email === email
        );

        if (exists) {
            alert("Username or email already exists!");
            return;
        }

        /* ================= CREATE USER ================= */

        users.push({
            fullName,
            email,
            username,
            password,
            role: "user",
            status: "active"
        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful! Please log in.");
        window.location.href = "login.html";
    });

});