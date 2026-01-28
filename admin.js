// admin.js
document.addEventListener("DOMContentLoaded", function () {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    /* ================== ACCESS CONTROL ================== */

    if (!loggedInUser) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    if (loggedInUser.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "index.html";
        return;
    }

    /* ================== LOAD USERS ================== */

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.getElementById("adminUsersTable");

    const searchInput = document.getElementById("userSearch");


    function renderUsers(filterText = "") {
        tableBody.innerHTML = "";


        users.forEach((user, index) => {

            // 🚫 3️⃣ HIDE ADMINS FROM LIST
            if (user.role === "admin") return;


            // 🔍 SEARCH FILTER
            const search = filterText.toLowerCase();
            if (
                !user.fullName.toLowerCase().includes(search) &&
                !user.username.toLowerCase().includes(search)
            ) return;


            const row = document.createElement("div");
            row.classList.add("table-row");


            const statusClass = user.status === "inactive" ? "inactive" : "active";


            row.innerHTML = `
<span>${user.fullName}</span>
<span>${user.username}</span>
<span>${user.gmail}</span>
<span class="status ${statusClass}">
${user.status}
</span>
<span class="actions">
<button class="toggle" data-index="${index}">
${user.status === "active" ? "Deactivate" : "Activate"}
</button>
</span>
`;


            tableBody.appendChild(row);
        });
    }


    renderUsers();


    /* ================= SEARCH HANDLER ================= */


    searchInput.addEventListener("input", function () {
        renderUsers(this.value);
    });


    /* ================= TOGGLE STATUS ================= */


    tableBody.addEventListener("click", function (e) {


        if (!e.target.classList.contains("toggle")) return;


        const index = e.target.dataset.index;


        // Prevent admin disabling self
        if (users[index].username === loggedInUser.username) {
            alert("You cannot deactivate yourself.");
            return;
        }


        users[index].status =
            users[index].status === "active" ? "inactive" : "active";


        localStorage.setItem("users", JSON.stringify(users));
        renderUsers(searchInput.value);
    });


});