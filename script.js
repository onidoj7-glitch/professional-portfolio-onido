// ==============================
// PORTFOLIO JAVASCRIPT
// ==============================

// ==============================
// LIGHT MODE AND DARK MODE
// ==============================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(theme) {
    const isDark = theme === "dark";
    const selectedTheme = isDark ? "dark" : "light";

    // Apply the theme to the entire HTML document.
    document.documentElement.setAttribute(
        "data-theme",
        selectedTheme
    );
    
    console.log(
    "Current theme:",
    document.documentElement.getAttribute("data-theme")
);
console.log(
    "Page background:",
    getComputedStyle(document.body).backgroundColor
);

    // Save the selected theme on this device.
    try {
        localStorage.setItem("portfolio-theme", selectedTheme);
    } catch (error) {
        console.warn("Unable to save the selected theme.");
    }

    // Update the toggle button.
    if (themeToggle && themeIcon && themeLabel) {
        themeIcon.textContent = isDark ? "☀️" : "🌙";

        themeLabel.textContent = isDark
            ? "Light mode"
            : "Dark mode";

        themeToggle.setAttribute(
            "aria-pressed",
            String(isDark)
        );

        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

// Load the saved theme, or use light mode by default.
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
    console.warn("Unable to read the saved theme.");
}

applyTheme(savedTheme);

// Switch themes when the button is clicked.
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const nextTheme =
            currentTheme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);
    });
}


// Update the footer year automatically.
const yearElement = document.getElementById("currentYear");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Close the mobile navigation after someone chooses a section.
const navElement = document.getElementById("portfolioNav");
const navLinks = document.querySelectorAll("#portfolioNav .nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 992 && navElement.classList.contains("show")) {
            const collapse = bootstrap.Collapse.getOrCreateInstance(navElement);
            collapse.hide();
        }
    });
});

// Replace this with your real email address before publishing.
const portfolioEmail = "onidoJ7@gmail.com";
const emailLink = document.getElementById("emailLink");

if (emailLink && portfolioEmail !== "onidoJ7@gmail.com") {
    emailLink.href = `mailto:${portfolioEmail}`;
    emailLink.textContent = portfolioEmail;
}

// Project summaries shown in the Bootstrap modal.
const projectDetails = {
    inventory: {
        title: "Sales, Ordering and Inventory Tracking Management System",
        text: "This proposed system focuses on business-side records for sales, orders, and inventory. A final project write-up should explain the actual users, the features implemented, the technologies used, and how the system was tested."
    },
    parserve: {
        title: "Par-ServePH",
        text: "This academic web-system concept focuses on parking and vehicle-rental management. Add your specific responsibilities, implemented features, screenshots, and technologies here so the portfolio accurately reflects your contribution."
    },
    famco: {
        title: "FAMCO Inventory and Sales Management System",
        text: "This academic project focuses on organizing product inventory and sales records for a baby-products business. Add the implemented modules, testing evidence, your role, and a repository or demonstration link when available."
    }
};

const projectModalElement = document.getElementById("projectModal");

if (projectModalElement && typeof bootstrap !== "undefined") {
    const projectModal = bootstrap.Modal.getOrCreateInstance(projectModalElement);
    const modalTitle = document.getElementById("projectModalTitle");
    const modalBody = document.getElementById("projectModalBody");

    document.querySelectorAll(".project-detail-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const project = projectDetails[button.dataset.project];

            if (!project) return;

            modalTitle.textContent = project.title;
            modalBody.textContent = project.text;
            projectModal.show();
        });
    });
}
