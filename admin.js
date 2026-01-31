// admin.js
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");

    if (!container) {
        console.error("toastContainer missing in HTML");
        return;
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


document.addEventListener("DOMContentLoaded", function () {

    /* ================= EMAIL VALIDATION ================= */

    const freshEmail = document.getElementById("newEmail");
    const newEmailError = document.getElementById("newEmailError");

    function isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    }

    // live fix while typing
    freshEmail.addEventListener("input", function () {
        if (isValidEmail(freshEmail.value.trim())) {
            newEmailError.style.display = "none";
            freshEmail.classList.remove("input-error");
        }
    });

    /* ================= ACCESS CONTROL ================= */

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || loggedInUser.role !== "admin") {
        alert("Admins only");
        window.location.href = "index.html";
        return;
    }

    /* ================= ELEMENTS ================= */

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const tableBody = document.getElementById("adminUsersTable");
    const searchInput = document.getElementById("userSearch");

    // Edit modal
    const editModal = document.getElementById("editUserModal");
    const editIndexInput = document.getElementById("editUserIndex");
    const editFullName = document.getElementById("editFullName");
    const editEmail = document.getElementById("editEmail");
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
    const newPassword = document.getElementById("newPassword");
    const newStatus = document.getElementById("newStatus");

    /* ================= RENDER USERS ================= */

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
                <span>${user.email}</span>
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

    /* ================= SEARCH ================= */

    searchInput.addEventListener("input", e =>
        renderUsers(e.target.value)
    );

    /* ================= TABLE CLICK ================= */

    tableBody.addEventListener("click", function (e) {

        // Toggle status
        if (e.target.classList.contains("toggle")) {

            const index = e.target.dataset.index;
            const user = users[index];

            user.status = user.status === "active" ? "inactive" : "active";

            localStorage.setItem("users", JSON.stringify(users));
            renderUsers(searchInput.value);

            showToast(
                `User ${user.username} is now ${user.status}`,
                "info"
            );

            return;
        }


        // Row click → edit
        const row = e.target.closest(".table-row");
        if (!row) return;

        const index = row.dataset.index;
        const user = users[index];

        editIndexInput.value = index;

        // toast msg
        editFullName.readOnly = true;
        editEmail.readOnly = true;

        if (!editFullName.dataset.toastBound) {
            editFullName.onclick = () => {
                showToast("Full name cannot be edited", "warning");
            };
            editFullName.dataset.toastBound = "true";
        }

        if (!editEmail.dataset.toastBound) {
            editEmail.onclick = () => {
                showToast("Email cannot be edited", "warning");
            };
            editEmail.dataset.toastBound = "true";
        }

        editStatus.value = user.status;
        editModal.classList.remove("hidden");
    });

    /* ================= EDIT MODAL ================= */

    closeBtn.onclick = () => editModal.classList.add("hidden");

    saveBtn.onclick = () => {

        const index = editIndexInput.value;

        users[index].fullName = editFullName.value.trim();
        users[index].email = editEmail.value.trim();
        users[index].status = editStatus.value;

        localStorage.setItem("users", JSON.stringify(users));
        editModal.classList.add("hidden");
        renderUsers(searchInput.value);
    };

    /* ================= ADD USER ================= */

    addUserBtn.onclick = () => {
        newEmailError.style.display = "none";
        freshEmail.classList.remove("input-error");
        addModal.classList.remove("hidden");
    };

    closeAddUserModal.onclick = () => {
        addModal.classList.add("hidden");

        // Clear all inputs
        newFullName.value = "";
        newUsername.value = "";
        newEmail.value = "";
        newPassword.value = "";
        newStatus.value = "active";

        // Clear error UI
        newEmailError.style.display = "none";
        newEmail.classList.remove("input-error");
    };


    createUserBtn.onclick = () => {

        if (
            !newFullName.value ||
            !newUsername.value ||
            !freshEmail.value ||
            !newPassword.value
        ) {
            alert("All fields required");
            return;
        }

        // Gmail validation
        if (!isValidEmail(freshEmail.value.trim())) {
            newEmailError.style.display = "block";
            freshEmail.classList.add("input-error");
            return;
        }

        const exists = users.some(
            u =>
                u.username === newUsername.value.trim() ||
                u.email === freshEmail.value.trim()
        );

        if (exists) {
            alert("Username or email already exists");
            return;
        }

        users.push({
            fullName: newFullName.value.trim(),
            username: newUsername.value.trim(),
            email: freshEmail.value.trim(),
            password: newPassword.value,
            role: "user",
            status: newStatus.value
        });

        localStorage.setItem("users", JSON.stringify(users));

        addModal.classList.add("hidden");
        renderUsers(searchInput.value);

        // reset
        newFullName.value = "";
        newUsername.value = "";
        freshEmail.value = "";
        newPassword.value = "";
        newStatus.value = "active";
    };

});