// ================= ADMIN INITIALIZER =================
(function createDefaultAdmin() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const adminExists = users.some(user => user.role === "admin");

    if (!adminExists) {
        const adminUser = {
            fullName: "Admin",
            gmail: "admin@gmail.com",
            username: "admin",
            password: "Admin@123",
            role: "admin",
            status: "active"
        };

        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));

        console.log("✅ Default admin created");
    }
})();

// global.js
document.addEventListener("DOMContentLoaded", function () {

    // ===== COMMON ELEMENTS (SAFE QUERIES) =====
    const signupBtn = document.getElementById("signup");
    const loginBtn = document.getElementById("login");
    const accountBtn = document.getElementById("accountBtn");
    const joinLink = document.getElementById("joinLink");
    const usersBtn = document.getElementById("UsersBtn"); // ADMIN LINK
    const welcomeText = document.getElementById("welcome");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const welcomeShown = sessionStorage.getItem("welcomeShown");

    /* ================= AUTH UI ================= */

    if (loggedInUser) {

        // Hide guest UI
        signupBtn && (signupBtn.style.display = "none");
        loginBtn && (loginBtn.style.display = "none");
        joinLink && (joinLink.style.display = "none");

        // Show account icon
        accountBtn && (accountBtn.style.display = "list-item");

        // 🔐 Admin-only link
        if (usersBtn) {
            usersBtn.style.display =
                loggedInUser.role === "admin" ? "list-item" : "none";
        }

        // Welcome text (HOME ONLY)
        if (welcomeText && !welcomeShown) {
            welcomeText.textContent = `Welcome, ${loggedInUser.fullName}! 👋`;
            sessionStorage.setItem("welcomeShown", "true");

            setTimeout(() => {
                welcomeText.style.opacity = "0";
            }, 4000);
        }

    } else {
        // Guest UI
        signupBtn && (signupBtn.style.display = "inline-block");
        loginBtn && (loginBtn.style.display = "inline-block");
        joinLink && (joinLink.style.display = "inline-block");

        accountBtn && (accountBtn.style.display = "none");
        usersBtn && (usersBtn.style.display = "none");

        welcomeText && (welcomeText.textContent = "");
    }


});
