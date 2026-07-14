"use strict";
const CART_KEY = "carritoCabanita";
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.cantidad, 0);
    document.querySelectorAll("#cartCount").forEach((el) => (el.textContent = count));
}
function addToCart(id) {
    const cart = getCart();
    const item = cart.find((p) => p.id === id);
    if (item) item.cantidad += 1;
    else cart.push({ id, cantidad: 1 });
    saveCart(cart);
    toast("Producto agregado al carrito");
}
function toast(message) {
    let el = document.getElementById("appToast");
    if (!el) {
        el = document.createElement("div");
        el.id = "appToast";
        el.style.cssText =
            "position:fixed;right:20px;bottom:20px;z-index:10000;background:#460D0D;color:#fff;padding:12px 18px;border-radius:12px;box-shadow:0 8px 25px rgba(0,0,0,.25);transition:.25s";
        document.body.appendChild(el);
    }
    el.textContent = message;
    el.style.opacity = "1";
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => (el.style.opacity = "0"), 1800);
}
document.addEventListener("DOMContentLoaded", updateCartCount);

const THEME_KEY = "temaCabanita";

document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    initializeBackToTop();
});

function initializeTheme() {
    const toggle = document.getElementById("themeToggle");

    if (!toggle) {
        return;
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    document.body.classList.toggle("dark-theme", shouldUseDark);
    updateThemeButton(toggle);

    toggle.addEventListener("click", () => {
        const darkEnabled = document.body.classList.toggle("dark-theme");

        localStorage.setItem(THEME_KEY, darkEnabled ? "dark" : "light");
        updateThemeButton(toggle);
    });
}

function updateThemeButton(button) {
    const darkEnabled = document.body.classList.contains("dark-theme");
    const icon = button.querySelector("i");

    button.setAttribute("aria-label", darkEnabled ? "Activar modo claro" : "Activar modo nocturno");

    button.title = darkEnabled ? "Modo claro" : "Modo nocturno";

    if (icon) {
        icon.className = darkEnabled ? "bi bi-sun" : "bi bi-moon-stars";
    }
}

function initializeBackToTop() {
    const button = document.getElementById("backToTop");

    if (!button) {
        return;
    }

    const updateVisibility = () => {
        button.classList.toggle("is-visible", window.scrollY > 420);
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });

    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
        });
    });

    updateVisibility();
}
