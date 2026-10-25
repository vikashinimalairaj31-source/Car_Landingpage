// Dream Cars - Signup Functionality

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.onclick = () => {
            menuBtn.classList.toggle('fa-xmark');
            navbar.classList.toggle('active');
        };
    }

    // Handle form submission
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim().toLowerCase();
            const password = document.querySelector('#password').value.trim();
            const confirmPassword = document.querySelector('#confirm-password').value.trim();
            const phone = document.querySelector('#phone').value.trim();

            // Validate fields
            if (!name || !email || !password || !confirmPassword || !phone) {
                alert('Please fill out all required fields.');
                return;
            }

            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match! Please check and try again.');
                return;
            }

            // Validate password length
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            // Retrieve existing users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || {};

            if (users[email]) {
                alert('This email is already registered! Please login or use another email.');
                return;
            }

            // Save new user credentials
            users[email] = {
                name,
                email,
                password,
                phone,
                registeredAt: new Date().toISOString()
            };
            localStorage.setItem('users', JSON.stringify(users));

            // Log user in automatically
            localStorage.setItem('loggedInUser', email);
            localStorage.setItem('user', JSON.stringify({ name, email, phone }));

            alert(`Account created successfully! Welcome to Dream Cars, ${name}.`);
            window.location.href = 'index.html';
        });
    }

    // Social signup handlers
    const googleBtn = document.querySelector('.social-btn.google');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            alert('Google authentication is simulated in static mode. Please use the form above to sign up.');
        });
    }

    const facebookBtn = document.querySelector('.social-btn.facebook');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            alert('Facebook authentication is simulated in static mode. Please use the form above to sign up.');
        });
    }

    // Phone number input restriction
    const phoneInput = document.querySelector('#phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            const clean = e.target.value.replace(/\D/g, '');
            if (clean.length > 10) {
                e.target.value = clean.slice(0, 10);
            } else {
                e.target.value = clean;
            }
        });
    }
});