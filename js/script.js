// ==========================================================================
// DREAM CARS - State-of-the-Art Automotive Showcase Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Toast Notification System ---
    function showToast(message, type = 'success') {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `toast-item ${type === 'error' ? 'toast-error' : ''}`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        // Slide in
        setTimeout(() => toast.classList.add('show'), 20);

        // Slide out & remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3600);
    }

    // --- Mobile & Tablet Menu Controls ---
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

    // Close mobile menu when clicking any nav link
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close when clicking outside header & navbar
    document.addEventListener('click', (e) => {
        if (navbar && navbar.classList.contains('active')) {
            if (!navbar.contains(e.target) && (!menuBtn || !menuBtn.contains(e.target))) {
                closeMobileMenu();
            }
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // --- Header Scroll Effect & ScrollSpy ---
    const header = document.querySelector('.header') || document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        // Header shadow/shrink
        if (header) {
            if (scrollY > 20) {
                header.classList.add('active');
            } else {
                header.classList.remove('active');
            }
        }

        // ScrollSpy Active Link Tracking
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Back to Top Button Toggle
        const backToTopBtn = document.querySelector('#back-to-top');
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // Back to top click handler
    const backToTopBtn = document.querySelector('#back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }



    // --- Login Modal Controls ---
    const loginBtn = document.querySelector('#login-btn');
    const closeLoginBtn = document.querySelector('#close-login-btn');
    const loginFormContainer = document.querySelector('.login-form-container');

    if (loginBtn && loginFormContainer) {
        loginBtn.onclick = (e) => {
            e.preventDefault();
            loginFormContainer.classList.add('active');
        };
    }

    if (closeLoginBtn && loginFormContainer) {
        closeLoginBtn.onclick = () => {
            loginFormContainer.classList.remove('active');
        };
    }

    // Close modal when clicking outside form
    if (loginFormContainer) {
        loginFormContainer.addEventListener('click', (e) => {
            if (e.target === loginFormContainer) {
                loginFormContainer.classList.remove('active');
            }
        });
    }

    // --- User Authentication (Client-side localStorage) ---
    function updateUserInterface() {
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            user = null;
        }

        const loggedInEmail = localStorage.getItem('loggedInUser');
        const loginBtnEl = document.querySelector('#login-btn');
        const userInfoEl = document.querySelector('#user-info');
        const userNameEl = document.querySelector('.user-name');

        if (user && user.name) {
            if (loginBtnEl) loginBtnEl.style.display = 'none';
            if (userInfoEl) userInfoEl.style.display = 'flex';
            if (userNameEl) userNameEl.textContent = `Welcome, ${user.name}`;
        } else if (loggedInEmail) {
            const displayName = loggedInEmail.split('@')[0];
            if (loginBtnEl) loginBtnEl.style.display = 'none';
            if (userInfoEl) userInfoEl.style.display = 'flex';
            if (userNameEl) userNameEl.textContent = `Welcome, ${displayName}`;
        } else {
            if (loginBtnEl) loginBtnEl.style.display = 'flex';
            if (userInfoEl) userInfoEl.style.display = 'none';
            if (userNameEl) userNameEl.textContent = '';
        }
    }

    // Initialize UI on load
    updateUserInterface();

    // Logout handling
    const logoutBtn = document.querySelector('#logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('loggedInUser');
            updateUserInterface();
            showToast('You have signed out successfully.', 'success');
        });
    }

    // Handle Login Form Submission inside Modal
    const modalLoginForm = document.querySelector('#login-form');
    if (modalLoginForm) {
        modalLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.querySelector('#login-email');
            const passInput = document.querySelector('#login-password');

            if (!emailInput || !passInput) return;

            const email = emailInput.value.trim().toLowerCase();
            const password = passInput.value.trim();

            const users = JSON.parse(localStorage.getItem('users')) || {};
            const registeredUser = users[email];

            if (!registeredUser) {
                showToast('No account found with this email. Please register first.', 'error');
                return;
            }

            const storedPassword = typeof registeredUser === 'string' ? registeredUser : registeredUser.password;
            const userName = typeof registeredUser === 'object' && registeredUser.name ? registeredUser.name : email.split('@')[0];

            if (storedPassword !== password) {
                showToast('Incorrect password. Please try again.', 'error');
                return;
            }

            // Save user session
            localStorage.setItem('loggedInUser', email);
            localStorage.setItem('user', JSON.stringify({ name: userName, email }));

            updateUserInterface();
            if (loginFormContainer) {
                loginFormContainer.classList.remove('active');
            }
            modalLoginForm.reset();
            showToast(`Welcome back, ${userName}!`, 'success');
        });
    }

    // --- Popular Vehicles Slider & Thumbnails ---
    const vehicleWrapper = document.querySelector('.wraper-box');
    const vehicleBoxes = vehicleWrapper ? vehicleWrapper.querySelectorAll('.box') : [];
    const vehicleCircles = document.querySelectorAll('.activeCircle .fa-circle');
    const thumbItems = document.querySelectorAll('.vehicle-thumbnails .thumb-item');
    const vNextBtn = document.querySelector('#nextBtn');
    const vPreBtn = document.querySelector('#preBtn');
    let vIndex = 0;

    function updateVehicleSlider(index) {
        if (!vehicleBoxes.length) return;
        if (index >= vehicleBoxes.length) vIndex = 0;
        else if (index < 0) vIndex = vehicleBoxes.length - 1;
        else vIndex = index;

        if (vehicleWrapper) {
            vehicleWrapper.style.transform = `translateX(${vIndex * -100}%)`;
        }

        vehicleBoxes.forEach((box, i) => {
            if (i === vIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });

        vehicleCircles.forEach((circle, i) => {
            if (i === vIndex) {
                circle.classList.add('fa-solid');
            } else {
                circle.classList.remove('fa-solid');
            }
        });

        thumbItems.forEach((thumb, i) => {
            if (i === vIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    if (vNextBtn) {
        vNextBtn.onclick = () => updateVehicleSlider(vIndex + 1);
    }
    if (vPreBtn) {
        vPreBtn.onclick = () => updateVehicleSlider(vIndex - 1);
    }
    vehicleCircles.forEach((circle, i) => {
        circle.style.cursor = 'pointer';
        circle.onclick = () => updateVehicleSlider(i);
    });

    thumbItems.forEach((thumb, i) => {
        thumb.addEventListener('click', () => updateVehicleSlider(i));
    });

    // --- Featured Cars Slider ("The Luxury Vault") ---
    const fWrapper = document.querySelector('.featured-wrapper-box');
    const fBoxes = fWrapper ? fWrapper.querySelectorAll('.box') : [];
    const fCircles = document.querySelectorAll('.fActCircle .fa-circle');
    const fNextBtn = document.querySelector('#fNextBtn');
    const fPreBtn = document.querySelector('#fPreBtn');
    let fIndex = 0;

    function updateFeaturedSlider(index) {
        if (!fBoxes.length) return;
        const visibleCards = window.innerWidth > 991 ? 3 : (window.innerWidth > 768 ? 2 : 1);
        const maxIndex = Math.max(0, fBoxes.length - visibleCards);

        if (index > maxIndex) {
            fIndex = 0;
        } else if (index < 0) {
            fIndex = maxIndex;
        } else {
            fIndex = index;
        }

        if (fWrapper && fBoxes[0]) {
            const cardWidth = fBoxes[0].getBoundingClientRect().width;
            const gap = 25;
            fWrapper.style.transform = `translateX(${fIndex * -(cardWidth + gap)}px)`;
        }

        fBoxes.forEach((box, i) => {
            if (i === fIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });

        fCircles.forEach((circle, i) => {
            if (i === fIndex) {
                circle.classList.add('fa-solid');
            } else {
                circle.classList.remove('fa-solid');
            }
        });
    }

    if (fNextBtn) {
        fNextBtn.onclick = () => updateFeaturedSlider(fIndex + 1);
    }
    if (fPreBtn) {
        fPreBtn.onclick = () => updateFeaturedSlider(fIndex - 1);
    }
    fCircles.forEach((circle, i) => {
        circle.style.cursor = 'pointer';
        circle.onclick = () => updateFeaturedSlider(i);
    });

    // Debounced Resize for Featured Slider
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateFeaturedSlider(fIndex);
        }, 150);
    });

    // --- Interactive Loan & EMI Calculator ---
    const priceRange = document.querySelector('#car-price-range');
    const downRange = document.querySelector('#down-payment-range');
    const tenureRange = document.querySelector('#tenure-range');
    const interestRange = document.querySelector('#interest-range');

    const priceVal = document.querySelector('#price-val');
    const downVal = document.querySelector('#down-val');
    const tenureVal = document.querySelector('#tenure-val');
    const interestVal = document.querySelector('#interest-val');

    const emiResult = document.querySelector('#emi-result');
    const principalResult = document.querySelector('#principal-result');
    const interestResult = document.querySelector('#interest-result');
    const totalResult = document.querySelector('#total-result');
    const applyFinanceBtn = document.querySelector('#apply-finance-btn');

    function formatINR(val) {
        return '₹ ' + Math.round(val).toLocaleString('en-IN');
    }

    function calculateEMI() {
        if (!priceRange || !downRange || !tenureRange || !interestRange) return;

        const price = parseFloat(priceRange.value);
        let down = parseFloat(downRange.value);

        // Ensure down payment never exceeds vehicle price
        if (down > price * 0.8) {
            down = price * 0.8;
            downRange.value = down;
        }
        downRange.max = price;

        const tenure = parseInt(tenureRange.value, 10);
        const annualRate = parseFloat(interestRange.value);

        const downPct = Math.round((down / price) * 100);
        const principal = price - down;

        // Display input label tags
        priceVal.textContent = formatINR(price);
        downVal.textContent = `${formatINR(down)} (${downPct}%)`;
        tenureVal.textContent = `${tenure} Months (${tenure / 12} Yrs)`;
        interestVal.textContent = `${annualRate.toFixed(2)}% p.a.`;

        // Monthly interest rate
        const r = (annualRate / 12) / 100;
        let emi = 0;
        let totalPayable = 0;
        let totalInterest = 0;

        if (r === 0 || principal <= 0) {
            emi = principal / tenure;
            totalPayable = principal;
            totalInterest = 0;
        } else {
            emi = (principal * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
            totalPayable = emi * tenure;
            totalInterest = totalPayable - principal;
        }

        // Output results
        emiResult.textContent = formatINR(emi);
        principalResult.textContent = formatINR(principal);
        interestResult.textContent = formatINR(totalInterest);
        totalResult.textContent = formatINR(totalPayable);

        if (applyFinanceBtn) {
            applyFinanceBtn.href = `bookappointment.html?car=Custom%20Finance&emi=${Math.round(emi)}&principal=${principal}`;
        }
    }

    if (priceRange && downRange && tenureRange && interestRange) {
        priceRange.addEventListener('input', calculateEMI);
        downRange.addEventListener('input', calculateEMI);
        tenureRange.addEventListener('input', calculateEMI);
        interestRange.addEventListener('input', calculateEMI);
        calculateEMI(); // initial run
    }

    // --- Reviews Slider ---
    const rWrapper = document.querySelector('.review-wrapper-box');
    const rBoxes = rWrapper ? rWrapper.querySelectorAll('.box') : [];
    const rCircles = document.querySelectorAll('.rActCircle .fa-circle');
    const rNextBtn = document.querySelector('#rNextBtn');
    const rPreBtn = document.querySelector('#rPreBtn');
    let rIndex = 0;

    function updateReviewSlider(index) {
        if (!rBoxes.length) return;
        if (index >= rBoxes.length) rIndex = 0;
        else if (index < 0) rIndex = rBoxes.length - 1;
        else rIndex = index;

        if (rWrapper) {
            rWrapper.style.transform = `translateX(${rIndex * -100}%)`;
        }

        rBoxes.forEach((box, i) => {
            if (i === rIndex) {
                box.classList.add('active');
            } else {
                box.classList.remove('active');
            }
        });

        rCircles.forEach((circle, i) => {
            if (i === rIndex) {
                circle.classList.add('fa-solid');
            } else {
                circle.classList.remove('fa-solid');
            }
        });
    }

    if (rNextBtn) {
        rNextBtn.onclick = () => updateReviewSlider(rIndex + 1);
    }
    if (rPreBtn) {
        rPreBtn.onclick = () => updateReviewSlider(rIndex - 1);
    }
    rCircles.forEach((circle, i) => {
        circle.style.cursor = 'pointer';
        circle.onclick = () => updateReviewSlider(i);
    });

    // --- Contact Form Handler ---
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('.box');
            const name = inputs[0] ? inputs[0].value.trim() : '';
            const email = inputs[1] ? inputs[1].value.trim() : '';
            const phone = inputs[2] ? inputs[2].value.trim() : '';
            const message = contactForm.querySelector('textarea') ? contactForm.querySelector('textarea').value.trim() : '';

            if (!name || !email) {
                showToast('Please enter your full name and official email.', 'error');
                return;
            }

            const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
            messages.push({
                name,
                email,
                phone,
                message,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contact_messages', JSON.stringify(messages));

            showToast(`Thank you, ${name}! Your inquiry has been submitted. An automotive advisor will connect with you shortly.`, 'success');
            contactForm.reset();
        });
    }

    // --- Subscribe Form Handler ---
    const subscribeForm = document.querySelector('.subscribe form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            if (!emailInput || !emailInput.value.trim()) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }
            showToast(`VIP alerts subscribed for ${emailInput.value.trim()}! Welcome to Dream Cars.`, 'success');
            subscribeForm.reset();
        });
    }
});
