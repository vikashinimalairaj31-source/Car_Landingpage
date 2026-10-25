// Dream Cars - Login and Quick-Signup Portal

document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const loginError = document.getElementById("login-error");
    const signupError = document.getElementById("signup-error");

    // Tab Switching
    if (loginTab && signupTab && loginForm && signupForm) {
        loginTab.addEventListener("click", () => {
            loginTab.classList.add("active");
            signupTab.classList.remove("active");
            loginForm.classList.add("active");
            signupForm.classList.remove("active");
            if (loginError) loginError.style.display = "none";
            if (signupError) signupError.style.display = "none";
        });

        signupTab.addEventListener("click", () => {
            signupTab.classList.add("active");
            loginTab.classList.remove("active");
            signupForm.classList.add("active");
            loginForm.classList.remove("active");
            if (loginError) loginError.style.display = "none";
            if (signupError) signupError.style.display = "none";
        });
    }

    // Handle Signup Form
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameInput = document.getElementById("signup-name");
            const emailInput = document.getElementById("signup-email");
            const passInput = document.getElementById("signup-password");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
            const password = passInput ? passInput.value.trim() : "";

            if (!email || !password) {
                if (signupError) {
                    signupError.textContent = "Please fill in all required fields.";
                    signupError.style.display = "block";
                }
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[email]) {
                if (signupError) {
                    signupError.textContent = "Email is already registered. Please log in.";
                    signupError.style.display = "block";
                }
                return;
            }

            // Save user in users database
            const displayName = name || email.split("@")[0];
            users[email] = {
                name: displayName,
                email: email,
                password: password,
                registeredAt: new Date().toISOString()
            };
            localStorage.setItem("users", JSON.stringify(users));

            // Log in
            localStorage.setItem("loggedInUser", email);
            localStorage.setItem("user", JSON.stringify({ name: displayName, email: email }));

            alert(`Welcome to Dream Cars, ${displayName}! Redirecting to showroom...`);
            window.location.href = "index.html";
        });
    }

    // Handle Login Form
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const emailInput = document.getElementById("login-email");
            const passInput = document.getElementById("login-password");

            const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
            const password = passInput ? passInput.value.trim() : "";

            if (!email || !password) {
                if (loginError) {
                    loginError.textContent = "Please provide both email and password.";
                    loginError.style.display = "block";
                }
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || {};
            const registeredUser = users[email];

            if (!registeredUser) {
                if (loginError) {
                    loginError.textContent = "No user found with this email. Please sign up.";
                    loginError.style.display = "block";
                }
                return;
            }

            const storedPassword = typeof registeredUser === "string" ? registeredUser : registeredUser.password;
            const displayName = typeof registeredUser === "object" && registeredUser.name ? registeredUser.name : email.split("@")[0];

            if (storedPassword !== password) {
                if (loginError) {
                    loginError.textContent = "Incorrect password. Please try again.";
                    loginError.style.display = "block";
                }
                return;
            }

            // Log in user
            localStorage.setItem("loggedInUser", email);
            localStorage.setItem("user", JSON.stringify({ name: displayName, email: email }));

            alert(`Login successful! Welcome back, ${displayName}.`);
            window.location.href = "index.html";
        });
    }
});
