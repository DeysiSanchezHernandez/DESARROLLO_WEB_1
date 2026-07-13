"use strict";

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-loading");

    document
        .querySelectorAll(
            'a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])',
        )
        .forEach((link) => {
            link.addEventListener("click", (e) => {
                if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

                const href = link.getAttribute("href");

                if (!href) return;

                e.preventDefault();

                showLoader();

                setTimeout(() => (location.href = href), 220);
            });
        });
});