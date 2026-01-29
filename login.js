// login.js
document.addEventListener("DOMContentLoaded", function () {

    const loginBtn = document.getElementById("signinBtn");

    loginBtn.addEventListener("click", function () {

        const inputValue = document.getElementById("gmail").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!inputValue || !password) {
            alert("Please enter username/email and password");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(user =>
            (user.username === inputValue || user.gmail === inputValue) &&
            user.password === password
        );

        if (!matchedUser) {
            alert("Invalid login credentials");
            return;
        }

        // 🚫 BLOCK INACTIVE USERS
        if (matchedUser.status === "inactive") {
            alert("Your account is inactive. Please contact admin.");
            return;
        }

        // Save session
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        sessionStorage.removeItem("welcomeShown");

        window.location.href = "index.html";
    });


});

