// admin.js
document.addEventListener("DOMContentLoaded", function () {

    /* ACCESS CONTROL */

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || loggedInUser.role !== "admin") {
        alert("Admins only");
        window.location.href = "index.html";
        return;
    }

    /* ELEMENTS */

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const tableBody = document.getElementById("adminUsersTable");
    const searchInput = document.getElementById("userSearch");

    // Edit modal
    const editModal = document.getElementById("editUserModal");
    const editIndexInput = document.getElementById("editUserIndex");
    const editFullName = document.getElementById("editFullName");
    const editGmail = document.getElementById("editGmail");
    const editStatus = document.getElementById("editStatus");
    const saveBtn = document.getElementById("saveUserBtn");
    const closeBtn = document.getElementById("closeModalBtn");

    // Add user modal
    const addUserBtn = document.getElementById("addUserBtn");
    const addModal = document.getElementById("addUserModal");
    const closeAddUserModal = document.getElementById("closeAddUserModal");
    const createUserBtn = document.getElementById("createUserBtn");

    const newFullName = document.getElementById("newFullName");
    const newUsername = document.getElementById("newUsername");
    const newGmail = document.getElementById("newGmail");
    const newPassword = document.getElementById("newPassword");
    const newStatus = document.getElementById("newStatus");

    /* RENDER USERS */

    function renderUsers(filterText = "") {
        tableBody.innerHTML = "";

        users.forEach((user, index) => {

            if (user.role === "admin") return;

            const search = filterText.toLowerCase();
            if (
                !user.fullName.toLowerCase().includes(search) &&
                !user.username.toLowerCase().includes(search)
            ) return;

            const row = document.createElement("div");
            row.className = "table-row";
            row.dataset.index = index;

            row.innerHTML = `
                <span>${user.fullName}</span>
                <span>${user.username}</span>
                <span>${user.gmail}</span>
                <span class="status ${user.status}">${user.status}</span>
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

    /* SEARCH */

    searchInput.addEventListener("input", e =>
        renderUsers(e.target.value)
    );

    /* TABLE CLICK */

    tableBody.addEventListener("click", function (e) {

        // Toggle status
        if (e.target.classList.contains("toggle")) {
            const index = e.target.dataset.index;

            users[index].status =
                users[index].status === "active" ? "inactive" : "active";

            localStorage.setItem("users", JSON.stringify(users));
            renderUsers(searchInput.value);
            return;
        }

        // Row click → edit
        const row = e.target.closest(".table-row");
        if (!row) return;

        const index = row.dataset.index;
        const user = users[index];

        editIndexInput.value = index;
        editFullName.value = user.fullName;
        editGmail.value = user.gmail;
        editStatus.value = user.status;

        editModal.classList.remove("hidden");
    });

    /* EDIT MODAL */

    closeBtn.onclick = () => editModal.classList.add("hidden");

    saveBtn.onclick = () => {
        const index = editIndexInput.value;

        users[index].fullName = editFullName.value.trim();
        users[index].gmail = editGmail.value.trim();
        users[index].status = editStatus.value;

        localStorage.setItem("users", JSON.stringify(users));
        editModal.classList.add("hidden");
        renderUsers(searchInput.value);
    };

    /* ADD USER */

    addUserBtn.onclick = () => addModal.classList.remove("hidden");

    closeAddUserModal.onclick = () => addModal.classList.add("hidden");

    createUserBtn.onclick = () => {

        if (!newFullName.value || !newUsername.value || !newGmail.value || !newPassword.value) {
            alert("All fields required");
            return;
        }

        const exists = users.some(
            u => u.username === newUsername.value || u.gmail === newGmail.value
        );

        if (exists) {
            alert("Username or Gmail already exists");
            return;
        }

        users.push({
            fullName: newFullName.value.trim(),
            username: newUsername.value.trim(),
            gmail: newGmail.value.trim(),
            password: newPassword.value,
            role: "user",
            status: newStatus.value
            
        });

        localStorage.setItem("users", JSON.stringify(users));

        addModal.classList.add("hidden");
        renderUsers(searchInput.value);

        // reset fields
        newFullName.value = "";
        newUsername.value = "";
        newGmail.value = "";
        newPassword.value = "";
        newStatus.value = "active";
    };
const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
  window.location.href = "index.html";
}
    
});



