// ==============================
// PORTFOLIO JAVASCRIPT
// ==============================

// ==============================
// LIGHT MODE AND DARK MODE
// ==============================
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const savedTheme = localStorage.getItem("portfolio-theme");

// Use the saved theme if available. Otherwise, start in light mode.
function applyTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

    if (themeToggle && themeIcon && themeLabel) {
        themeIcon.textContent = isDark ? "☀️" : "🌙";
        themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isCurrentlyDark = document.documentElement.getAttribute("data-theme") === "dark";
        const nextTheme = isCurrentlyDark ? "light" : "dark";

        applyTheme(nextTheme);
        localStorage.setItem("portfolio-theme", nextTheme);
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
