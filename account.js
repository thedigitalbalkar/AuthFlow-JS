document.addEventListener("DOMContentLoaded", function () {

    // 1️⃣ Get logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // 2️⃣ Protect dashboard (no direct access)
    if (!loggedInUser) {
        window.location.href = "login.html";
        return;
    }

    // 3️⃣ Populate user info
    document.getElementById("userName").textContent = loggedInUser.fullName;
    document.getElementById("userUsername").textContent = loggedInUser.username;
    document.getElementById("userEmail").textContent = loggedInUser.email;

    // 4️⃣ Logout logic (both buttons)
    const logoutBtn = document.getElementById("logoutBtn");
    const logoutBtn2 = document.getElementById("logoutBtn2");

    function logout() {
        localStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("welcomeShown");
        window.location.href = "login.html";
    }

    logoutBtn.addEventListener("click", logout);
    logoutBtn2.addEventListener("click", logout);

});