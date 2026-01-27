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
    document.getElementById("userGmail").textContent = loggedInUser.gmail;

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

// Populate "Other Users" dropdown
const users = JSON.parse(localStorage.getItem("users")) || [];
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const dropdown = document.getElementById("otherUsersDropdown");

if (dropdown && loggedInUser) {
  const otherUsers = users.filter(
    user => user.username !== loggedInUser.username
  );

  otherUsers.forEach(user => {
    const option = document.createElement("option");
    option.value = user.username;
    option.textContent = `${user.fullName} (${user.username})`;
    dropdown.appendChild(option);
  });

  // Optional: handle selection (read-only demo)
//   dropdown.addEventListener("change", function () {
//     if (this.value) {
//       alert(`Selected user: ${this.value}`);
//     }
//   });
}