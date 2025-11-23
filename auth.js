// ------------------ SIGNUP ------------------
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("signupName").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const password = document.getElementById("signupPassword").value;

            const userData = { name, email, password };
            localStorage.setItem("user", JSON.stringify(userData));

            alert("Account created successfully!");
            window.location.href = "login.html";
        });
    }

    // ------------------ LOGIN ------------------
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;

            const savedUser = JSON.parse(localStorage.getItem("user"));

            if (!savedUser) {
                alert("No account found. Please sign up first.");
                return;
            }

            if (email === savedUser.email && password === savedUser.password) {
                alert("Login successful!");
                window.location.href = "index.html"; // redirect works now
            } else {
                alert("Incorrect email or password!");
            }
        });
    }
});