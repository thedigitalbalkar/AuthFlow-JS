document.addEventListener("DOMContentLoaded", function () {

    const signupBtn = document.getElementById("signup");
    const loginBtn = document.getElementById("login");
    const accountBtn = document.getElementById("accountBtn");
    const joinLink = document.getElementById("joinLink");
    const welcomeText = document.getElementById("welcome");

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const welcomeShown = sessionStorage.getItem("welcomeShown");

    if (loggedInUser) {

        // UI after login
        signupBtn.style.display = "none";
        loginBtn.style.display = "none";
        joinLink.style.display = "none";
        accountBtn.style.display = "list-item";

        // show welcome ONLY once per login session
        if (!welcomeShown) {
            welcomeText.textContent = `Welcome, ${loggedInUser.fullName}! 👋`;
            sessionStorage.setItem("welcomeShown", "true");

            setTimeout(() => {
                welcomeText.style.opacity = "0";
            }, 4000);
        }

    } else {
        // UI before login / after logout
        signupBtn.style.display = "inline-block";
        loginBtn.style.display = "inline-block";
        joinLink.style.display = "inline-block";
        accountBtn.style.display = "none";
        welcomeText.textContent = "";
    }
});