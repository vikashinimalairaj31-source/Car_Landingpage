# 🏎️ DREAM CARS — Certified Luxury & Pre-Owned Automotive Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**DREAM CARS** is a certified pre-owned and exotic automotive showroom web application. Built strictly with pure **HTML5, CSS3, and Vanilla JavaScript**, it delivers a luxury dealership experience inspired by automotive brands like Porsche, Mercedes-Benz, and BMW.

---

## 🌟 Key Features

### 1. 🏆 Full-Screen Luxury Hero Showcase
- Expansive full-width vehicle showcase featuring ambient champagne gold floor lighting and drop reflections.
- Typography pairing Google Fonts **Outfit** (headings) with **Plus Jakarta Sans** (body text).
- Verified trust highlights: *150-Point Inspection Scan*, *1-Year Comprehensive Warranty*, *Doorstep VIP Test Drive*, and *Instant 0% Down Financing*.

### 2. 🚗 Certified Inventory Slider & Quick Switcher
- Smooth carousel browsing single-owner certified models (Volkswagen Polo GT TSI, Maruti Suzuki Swift ZXi+, Hyundai Venue Turbo, Renault Kiger RXZ, Skoda Rapid TSI, and Tata Punch).
- **Interactive Thumbnails**: Dedicated vehicle switcher buttons underneath the slider allowing one-click jumping to any car.
- **Specifications Grid**: Detailed 4-point pill matrix displaying Model Year, Transmission, Fuel / Engine, and Verified Mileage.
- Direct booking integration passing vehicle query parameters to the consultation scheduler.

### 3. 💎 "The Luxury Vault" (Black-Label Exotic Supercars)
- Dark obsidian (`#090d16`) showcase curated for exotic performance vehicles:
  - BMW M-5 Competition
  - Rolls-Royce Phantom VIII
  - Mercedes-Maybach S-Class
  - Lexus LC 500h Coupe
  - Lamborghini Huracán EVO
  - Cadillac Escalade Platinum
  - Audi R8 V10 Plus
  - Mercedes-AMG GT Coupe
- Displaying horsepower badges, 5-star verified ratings, prices in Crores, and private concierge inquiry triggers.

### 4. 📊 Real-Time Interactive Auto Financing & EMI Calculator
- Live interactive loan calculator with dual range sliders:
  - **Vehicle Price**: ₹3 Lakh to ₹1 Crore.
  - **Down Payment**: ₹0 (Zero Down) to ₹50 Lakh with auto-capping constraints.
  - **Loan Tenure**: 12 to 84 Months.
  - **Interest Rate**: 7.0% to 15.0% p.a.
- Real-time dynamic calculation of **Monthly EMI**, **Loan Principal**, **Total Interest**, and **Total Payable** formatted in Indian Rupee format (`₹ 29,599`).
- *"Apply for Paperless Loan"* carries calculated figures directly into the booking form.

### 5. 🛠️ Premium Ownership Services
- Clean 6-card grid highlighting dealership offerings: *Certified Pre-Owned Sales*, *Doorstep VIP Test Drive*, *Instant Auto Financing*, *1-Year Dealership Warranty*, *Guaranteed Trade-In Value*, and *Ceramic Detailing Studio*.
- Replaced repetitive per-card buttons with a single centered consultation CTA.

### 6. 💬 Verified Client Testimonials
- Testimonial carousel featuring verified buyer feedback, client photos, purchased vehicle tags, and 5-star rating displays.

### 7. 📅 VIP Consultation & Doorstep Test Drive Booking (`bookappointment.html`)
- Pre-fills user details if logged in and automatically selects vehicles via URL parameters (`?car=...&emi=...`).
- Stores appointment requests locally in `localStorage`.

### 8. 🔐 Client Authentication Portal (`login.html` & `signup.html`)
- Dedicated obsidian glassmorphic card portals.
- Full client-side registration and authentication with session persistence.

### 9. 🔔 Micro-Interactions & Floating Concierge
- **Toast Notification System**: Replaces standard browser alerts with floating toast notifications.
- **Floating Concierge**: Direct WhatsApp consultation button with hover tooltips.
- **Back to Top**: Smooth scroll-to-top floating button that appears on scroll.

---

## 📁 Project File Architecture

```
carzy cars websites/
├── index.html                  # Main Showroom Landing Page
├── bookappointment.html        # Concierge Test Drive & Consultation Form
├── login.html                  # Client Portal & Account Login
├── signup.html                 # VIP Registration Portal
├── favicon.svg                 # Vector Favicon (Root fallback)
│
├── css/
│   ├── style.css               # Core Luxury Automotive Design System (Tokens, Sliders, Layouts)
│   ├── bookappointment.css     # Appointment Booking Layout Stylesheet
│   ├── login.css               # Client Portal Stylesheet
│   └── signup.css              # VIP Registration Stylesheet
│
├── js/
│   ├── script.js               # Sliders, EMI Calculator, ScrollSpy, Toasts, Sticky Nav
│   ├── bookappointment.js      # Form Validation, URL Param Parser, Local Storage
│   ├── login.js                # Tab Switching & Login Authentication
│   └── signup.js               # User Registration & Account Creation
│
└── image/
    ├── favicon.svg             # Primary Vector SVG Favicon
    ├── car0.png                # Hero Supercar Asset
    ├── polo.png.png            # Volkswagen Polo GT TSI
    ├── swift.png.png           # Maruti Suzuki Swift ZXi+
    ├── venue.png               # Hyundai Venue SX (O)
    ├── kiger.png               # Renault Kiger RXZ
    ├── rapid2.png              # Skoda Rapid 1.0 TSI
    ├── tata punch.png          # Tata Punch Creative
    ├── m bwm.png               # BMW M5 Competition
    ├── rolls royce.png         # Rolls-Royce Phantom VIII
    ├── may2.png                # Mercedes-Maybach S-Class
    ├── lexus.png               # Lexus LC 500h Coupe
    ├── lambo.jpeg              # Lamborghini Huracán EVO
    ├── car12.png               # Cadillac Escalade
    ├── car13.png               # Audi R8 V10 Plus
    ├── car14.png               # Mercedes-AMG GT Coupe
    └── img1.jpg - img6.jpg     # Verified Client Testimonial Avatars
```

---

## 🎨 Design System & Palette

| Token | Hex / Value | Description |
|---|---|---|
| `--gold` | `#d99b26` | Primary luxury metallic gold accent |
| `--gold-light` | `#f5b041` | Highlight champagne gold |
| `--gold-gradient` | `linear-gradient(135deg, #e5a93c 0%, #d48b18 100%)` | Metallic gold surface gradient |
| `--obsidian` | `#090d16` | Deep luxury dark surface |
| `--surface-dark` | `#101626` | Dark card surface |
| `--bg-page` | `#f8fafc` | Clean off-white background |
| `--white` | `#ffffff` | Pure card surface |
| `--border-card` | `#e2e8f0` | Subtle card border |
| `--font-heading` | `'Outfit', sans-serif` | Automotive display typography |
| `--font-body` | `'Plus Jakarta Sans', sans-serif` | Clean interface typography |

---

## 🚀 Quick Start & Local Execution

This is a static web application requiring **no Node.js backend, no build tools, and no npm packages**.

### Method 1: VS Code Live Server (Recommended)
1. Open the repository directory in Visual Studio Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click [index.html](file:///c:/Users/kavya/OneDrive/Desktop/old_projects/carzy%20cars%20websites/index.html) and select **"Open with Live Server"**.
4. The application will launch at `http://127.0.0.1:5500/index.html` (or port `5502`).

### Method 2: Python Simple HTTP Server
If Python is installed on your machine:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Method 3: Direct File Opening
Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

---

## 💾 Client-Side Storage Schema (`localStorage`)

| Key | Type | Description |
|---|---|---|
| `users` | `Object` | Stores registered client credentials `{ email: { name, email, password, phone } }` |
| `loggedInUser` | `String` | Active user session email |
| `user` | `Object` | Active session metadata `{ name, email, phone }` |
| `appointments` | `Array` | Booked test-drive records `{ id, name, email, phone, car, date, time, notes }` |
| `contact_messages` | `Array` | Customer consultation inquiries from the contact section |

---

## 🌐 Browser Support

- **Google Chrome**: Version 90+ (Full support)
- **Microsoft Edge**: Version 90+ (Full support)
- **Mozilla Firefox**: Version 88+ (Full support)
- **Apple Safari**: Version 14+ (Full support)
- **Mobile Browsers**: iOS Safari, Chrome for Android, Samsung Internet

---

## 📄 License

This project is licensed under the **MIT License**.
