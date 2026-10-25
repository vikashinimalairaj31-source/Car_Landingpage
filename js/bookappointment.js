// Dream Cars - Book Appointment Functionality

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle & backdrop
    const menuBtn = document.querySelector('#menu-btn');
    const navbar = document.querySelector('.navbar');
    const navBackdrop = document.querySelector('#nav-backdrop');
    const navLinks = document.querySelectorAll('.header .navbar a');

    function openMobileMenu() {
        if (menuBtn && navbar) {
            menuBtn.classList.remove('fa-bars');
            menuBtn.classList.add('fa-xmark');
            navbar.classList.add('active');
            if (navBackdrop) navBackdrop.classList.add('active');
        }
    }

    function closeMobileMenu() {
        if (menuBtn && navbar) {
            menuBtn.classList.add('fa-bars');
            menuBtn.classList.remove('fa-xmark');
            navbar.classList.remove('active');
            if (navBackdrop) navBackdrop.classList.remove('active');
        }
    }

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navbar.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileMenu);
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
        if (navbar && navbar.classList.contains('active')) {
            if (!navbar.contains(e.target) && (!menuBtn || !menuBtn.contains(e.target))) {
                closeMobileMenu();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    // Set minimum date to today for appointment
    const dateInput = document.querySelector('#appointment-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Check for car or emi query parameter in URL (e.g., bookappointment.html?car=BMW%20M-5)
    const urlParams = new URLSearchParams(window.location.search);
    const carParam = urlParams.get('car');
    const emiParam = urlParams.get('emi');
    const carSelect = document.querySelector('#appointment-car');
    const notesInput = document.querySelector('#appointment-notes');

    if (emiParam && notesInput && !notesInput.value) {
        notesInput.value = `Pre-approved Financing Application: Estimated EMI ₹${parseInt(emiParam, 10).toLocaleString('en-IN')}/mo.`;
    }

    if (carParam && carSelect) {
        // If option exists, select it, otherwise add it and select it
        let found = false;
        for (let i = 0; i < carSelect.options.length; i++) {
            if (carSelect.options[i].value.toLowerCase() === carParam.toLowerCase()) {
                carSelect.selectedIndex = i;
                found = true;
                break;
            }
        }
        if (!found) {
            const newOption = new Option(carParam, carParam, true, true);
            carSelect.add(newOption);
        }
    }

    // Pre-fill user data if logged in
    try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const nameInput = document.querySelector('#appointment-name');
        const emailInput = document.querySelector('#appointment-email');
        const phoneInput = document.querySelector('#appointment-phone');

        if (currentUser) {
            if (nameInput && currentUser.name) nameInput.value = currentUser.name;
            if (emailInput && currentUser.email) emailInput.value = currentUser.email;
            if (phoneInput && currentUser.phone) phoneInput.value = currentUser.phone;
        }
    } catch (e) {
        // ignore
    }

    // Handle appointment form submission
    const form = document.querySelector('#appointment-form');
    const alertBox = document.querySelector('#appointment-alert');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.querySelector('#appointment-name').value.trim();
            const email = document.querySelector('#appointment-email').value.trim();
            const phone = document.querySelector('#appointment-phone') ? document.querySelector('#appointment-phone').value.trim() : '';
            const car = carSelect ? carSelect.value : 'General Inquiry';
            const date = document.querySelector('#appointment-date').value;
            const time = document.querySelector('#appointment-time').value;
            const notes = document.querySelector('#appointment-notes').value.trim();

            if (!name || !email || !date || !time) {
                if (alertBox) {
                    alertBox.textContent = 'Please fill out all required fields.';
                    alertBox.className = 'appointment-alert error';
                } else {
                    alert('Please fill out all required fields.');
                }
                return;
            }

            // Create appointment record
            const appointment = {
                id: 'APT-' + Date.now(),
                name,
                email,
                phone,
                car,
                date,
                time,
                notes,
                bookedAt: new Date().toISOString()
            };

            // Save to localStorage
            const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
            existingAppointments.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(existingAppointments));

            // Show success message
            if (alertBox) {
                alertBox.textContent = `Appointment confirmed for ${date} at ${time}! We look forward to seeing you.`;
                alertBox.className = 'appointment-alert success';
                alertBox.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert(`Appointment confirmed for ${date} at ${time}! We will contact you soon.`);
            }

            form.reset();
        });
    }
});
