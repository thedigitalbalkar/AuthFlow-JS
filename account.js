// account.js
document.addEventListener("DOMContentLoaded", function () {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userName").textContent = loggedInUser.fullName;
    document.getElementById("userUsername").textContent = loggedInUser.username;
    document.getElementById("userEmail").textContent = loggedInUser.email;

    // 🔒 Hide Admin/Users button for non-admins
    const usersBtn = document.getElementById("UsersBtn");


    if (usersBtn && loggedInUser.role !== "admin") {
        usersBtn.style.display = "none";
    }

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("welcomeShown");
        window.location.href = "index.html";
    });

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "index.html";
    }

});