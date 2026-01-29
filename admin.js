// admin.js
document.addEventListener("DOMContentLoaded", function () {

    /* ================= ACCESS CONTROL ================= */

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

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

    /* ================= ELEMENTS ================= */

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.getElementById("adminUsersTable");
    const searchInput = document.getElementById("userSearch");

    // Modal elements
    const modal = document.getElementById("editUserModal");
    const editIndexInput = document.getElementById("editUserIndex");
    const editFullName = document.getElementById("editFullName");
    const editGmail = document.getElementById("editGmail");
    const editStatus = document.getElementById("editStatus");
    const saveBtn = document.getElementById("saveUserBtn");
    const closeBtn = document.getElementById("closeModalBtn");

    /* ================= RENDER USERS ================= */

    function renderUsers(filterText = "") {
        tableBody.innerHTML = "";

        users.forEach((user, index) => {

            // 🚫 Hide admin accounts
            if (user.role === "admin") return;

            // 🔍 Search filter
            const search = filterText.toLowerCase();
            if (
                !user.fullName.toLowerCase().includes(search) &&
                !user.username.toLowerCase().includes(search)
            ) return;

            const row = document.createElement("div");
            row.classList.add("table-row");
            row.dataset.index = index;

            const statusClass = user.status === "inactive" ? "inactive" : "active";

            row.innerHTML = `
                <span>${user.fullName}</span>
                <span>${user.username}</span>
                <span>${user.gmail}</span>
                <span class="status ${statusClass}">${user.status}</span>
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

    /* ================= SEARCH ================= */

    searchInput.addEventListener("input", function () {
        renderUsers(this.value);
    });

    /* ================= TABLE CLICK HANDLER ================= */

    tableBody.addEventListener("click", function (e) {

        /* ===== TOGGLE STATUS ===== */
        if (e.target.classList.contains("toggle")) {

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
            return;
        }

        /* ===== ROW CLICK → OPEN MODAL ===== */
        const row = e.target.closest(".table-row");
        if (!row) return;

        const index = row.dataset.index;
        const user = users[index];

        if (!user || user.role === "admin") return;

        editIndexInput.value = index;
        editFullName.value = user.fullName;
        editGmail.value = user.gmail;
        editStatus.value = user.status;

        modal.classList.remove("hidden");
    });

    /* ================= MODAL ACTIONS ================= */

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    saveBtn.addEventListener("click", () => {

        const index = editIndexInput.value;

        users[index].fullName = editFullName.value.trim();
        users[index].gmail = editGmail.value.trim();
        users[index].status = editStatus.value;

        localStorage.setItem("users", JSON.stringify(users));

        modal.classList.add("hidden");
        renderUsers(searchInput.value);
    });

});