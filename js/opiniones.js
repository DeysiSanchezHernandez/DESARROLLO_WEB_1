"use strict";

const REVIEW_KEY = "opinionesCabanita";

const defaults = [
    {
        nombre: "Juan Carlos Mendoza",
        comentario: "El sabor ahumado y las cremas son excelentes. Siempre regreso con mi familia.",
        estrellas: 5,
        fecha: "Cliente frecuente",
    },
    {
        nombre: "Leyla Vásquez",
        comentario: "El mostrito llegó caliente y la atención fue muy amable.",
        estrellas: 5,
        fecha: "Cliente",
    },
    {
        nombre: "David S.",
        comentario: "El delivery fue rápido y el pedido llegó completo.",
        estrellas: 4,
        fecha: "Cliente",
    },
];

let reviews = JSON.parse(localStorage.getItem(REVIEW_KEY) || "null") || defaults;
let rating = 0;
let currentItemsPerSlide = 0;
let resizeTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    renderReviews();

    const carouselElement = document.getElementById("opinionesCarousel");

    if (carouselElement && window.bootstrap) {
        bootstrap.Carousel.getOrCreateInstance(carouselElement, {
            interval: 5500,
            ride: false,
            touch: true,
            wrap: true,
        });
    }

    document.getElementById("selectorEstrellas")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-rating]");

        if (!button) {
            return;
        }

        rating = Number(button.dataset.rating);
        paintStars();
    });

    document.getElementById("formOpinion")?.addEventListener("submit", submitReview);

    window.addEventListener("resize", handleResponsiveReviews, { passive: true });
});

function getItemsPerSlide() {
    if (window.innerWidth >= 1200) {
        return 3;
    }

    if (window.innerWidth >= 768) {
        return 2;
    }

    return 1;
}

function handleResponsiveReviews() {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(() => {
        const nextItemsPerSlide = getItemsPerSlide();

        if (nextItemsPerSlide !== currentItemsPerSlide) {
            renderReviews();
        }
    }, 180);
}

function paintStars() {
    document.querySelectorAll("#selectorEstrellas [data-rating]").forEach((button) => {
        button.classList.toggle("selected", Number(button.dataset.rating) <= rating);
    });
}

function submitReview(event) {
    event.preventDefault();

    const name = document.getElementById("nombreOpinion").value.trim();

    const comment = document.getElementById("comentarioOpinion").value.trim();

    const message = document.getElementById("mensajeOpinion");

    if (name.length < 2 || comment.length < 10 || !rating) {
        message.textContent = "Completa el nombre, comentario y las estrellas.";

        message.className = "mt-3 mb-0 text-danger";

        return;
    }

    reviews.unshift({
        nombre: name,
        comentario: comment,
        estrellas: rating,
        fecha: new Date().toLocaleDateString("es-PE"),
    });

    reviews = reviews.slice(0, 20);

    localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));

    event.target.reset();
    rating = 0;
    paintStars();
    renderReviews();

    message.textContent = "Gracias. Tu opinión fue publicada en este dispositivo.";

    message.className = "mt-3 mb-0 text-success";
}

function groupReviews(items, groupSize) {
    const groups = [];

    for (let index = 0; index < items.length; index += groupSize) {
        groups.push(items.slice(index, index + groupSize));
    }

    return groups;
}

function renderReviews() {
    updateReviewsAverage();
    const box = document.getElementById("listaOpiniones");

    const indicators = document.getElementById("indicadoresOpiniones");

    const carouselElement = document.getElementById("opinionesCarousel");

    if (!box) {
        return;
    }

    currentItemsPerSlide = getItemsPerSlide();

    const reviewGroups = groupReviews(reviews, currentItemsPerSlide);

    box.innerHTML = reviewGroups
        .map(
            (group, slideIndex) => `
            <article class="carousel-item ${slideIndex === 0 ? "active" : ""}">
                <section class="review-slide-grid review-count-${group.length}">
                    ${group.map((review) => createReviewCard(review)).join("")}
                </section>
            </article>
        `,
        )
        .join("");

    if (indicators) {
        indicators.innerHTML = reviewGroups
            .map(
                (_, index) => `
                <button
                    type="button"
                    data-bs-target="#opinionesCarousel"
                    data-bs-slide-to="${index}"
                    class="${index === 0 ? "active" : ""}"
                    aria-current="${index === 0 ? "true" : "false"}"
                    aria-label="Grupo de opiniones ${index + 1}"
                ></button>
            `,
            )
            .join("");
    }

    if (carouselElement && window.bootstrap) {
        const instance = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
            interval: 5500,
            ride: false,
            touch: true,
            wrap: true,
        });

        instance.to(0);
    }
}

function createReviewCard(review) {
    return `
        <article class="review-card">
            <p
                class="review-stars"
                aria-label="${review.estrellas} de 5 estrellas"
            >
                ${"★".repeat(review.estrellas)}
                ${"☆".repeat(5 - review.estrellas)}
            </p>

            <blockquote>
                “${escapeReview(review.comentario)}”
            </blockquote>

            <footer>
                <strong>
                    ${escapeReview(review.nombre)}
                </strong>

                <time>
                    ${escapeReview(review.fecha)}
                </time>
            </footer>
        </article>
    `;
}

function escapeReview(value) {
    return String(value).replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;",
            })[character],
    );
}

function updateReviewsAverage() {
    const numberElement = document.getElementById("promedioNumero");

    const starsElement = document.getElementById("promedioEstrellas");

    const textElement = document.getElementById("promedioTexto");

    if (!numberElement || !starsElement || !textElement) {
        return;
    }

    if (!reviews.length) {
        numberElement.textContent = "0.0";
        starsElement.textContent = "☆☆☆☆☆";
        starsElement.setAttribute("aria-label", "Sin calificaciones");
        textElement.textContent = "Sin calificaciones todavía";
        return;
    }

    const totalStars = reviews.reduce((sum, review) => sum + Number(review.estrellas || 0), 0);

    const average = totalStars / reviews.length;

    const roundedAverage = Math.round(average * 10) / 10;

    const fullStars = Math.floor(average);

    const hasHalfStar = average - fullStars >= 0.5;

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    numberElement.textContent = roundedAverage.toFixed(1);

    starsElement.innerHTML = [
        "★".repeat(fullStars),
        hasHalfStar ? '<span class="half-star" aria-hidden="true">★</span>' : "",
        "☆".repeat(emptyStars),
    ].join("");

    starsElement.setAttribute("aria-label", `${roundedAverage.toFixed(1)} de 5 estrellas`);

    textElement.textContent = `${reviews.length} opinión${reviews.length === 1 ? "" : "es"} registrada${reviews.length === 1 ? "" : "s"}`;
}
