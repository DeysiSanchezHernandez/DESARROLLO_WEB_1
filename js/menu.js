"use strict";

const menuState = {
    productos: [],
    categoria: "todos",
    orden: "destacados",
    busqueda: "",
};

const categoryLabels = {
    combos: "Combos",
    pollos: "Pollos a la brasa",
    parrillas: "Parrillas",
    papas: "Papas y acompañamientos",
    ensaladas: "Ensaladas",
    bebidas: "Bebidas",
    cremas: "Cremas",
};

const categoryOrder = ["combos", "pollos", "parrillas", "papas", "ensaladas", "bebidas", "cremas"];

document.addEventListener("DOMContentLoaded", initMenu);

function bindFilters() {
    document.getElementById("buscarProducto").addEventListener("input", (event) => {
        menuState.busqueda = event.target.value.trim().toLowerCase();
        renderProducts();
    });

    document.getElementById("filtroCategoria").addEventListener("change", (event) => {
        menuState.categoria = event.target.value;
        renderProducts();
    });

    document.getElementById("ordenProductos").addEventListener("change", (event) => {
        menuState.orden = event.target.value;
        renderProducts();
    });

    document.getElementById("contenedorProductos").addEventListener("click", (event) => {
        const button = event.target.closest("[data-add]");
        if (button) addToCart(button.dataset.add);
    });
}

function getFilteredProducts() {
    let list = [...menuState.productos];

    if (menuState.categoria !== "todos") {
        list = list.filter((product) => product.categoria === menuState.categoria);
    }

    if (menuState.busqueda) {
        list = list.filter((product) =>
            `${product.nombre} ${product.descripcion} ${product.categoria}`
                .toLowerCase()
                .includes(menuState.busqueda),
        );
    }

    if (menuState.orden === "menor") list.sort((a, b) => a.precio - b.precio);
    else if (menuState.orden === "mayor") list.sort((a, b) => b.precio - a.precio);
    else if (menuState.orden === "nombre")
        list.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    else list.sort((a, b) => Number(b.destacado) - Number(a.destacado));

    return list;
}

function renderProducts() {
    const products = getFilteredProducts();
    const box = document.getElementById("contenedorProductos");
    document.getElementById("contadorResultados").textContent = `${products.length} productos`;

    if (!products.length) {
        box.innerHTML =
            '<article class="alert alert-warning">No encontramos productos con esos filtros.</article>';
        return;
    }

    if (menuState.categoria !== "todos" || menuState.busqueda) {
        box.innerHTML = createCategorySection(
            menuState.categoria === "todos" ? "Resultados" : categoryLabels[menuState.categoria],
            products,
        );
        return;
    }

    box.innerHTML = categoryOrder
        .map((category) => {
            const group = products.filter((product) => product.categoria === category);
            return group.length ? createCategorySection(categoryLabels[category], group) : "";
        })
        .join("");
}

function createCategorySection(title, products) {
    return `
        <section class="menu-category" aria-labelledby="category-${slug(title)}">
            <header class="menu-category-header">
                <h2 id="category-${slug(title)}">${escapeHTML(title)}</h2>
                <span>${products.length} ${products.length === 1 ? "producto" : "productos"}</span>
            </header>
            <section class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
                ${products.map(createProductCard).join("")}
            </section>
        </section>
    `;
}

function createProductCard(product) {
    return `
        <article class="col">
            <section class="card product-card h-100">
                <figure class="product-image">
                    <img src="${escapeHTML(product.imagen)}" alt="${escapeHTML(product.nombre)}" loading="lazy">
                    ${product.destacado ? '<span class="product-badge">Recomendado</span>' : ""}
                </figure>
                <section class="card-body d-flex flex-column">
                    <span class="product-category">${escapeHTML(categoryLabels[product.categoria] || product.categoria)}</span>
                    <h3 class="h5">${escapeHTML(product.nombre)}</h3>
                    <p>${escapeHTML(product.descripcion)}</p>
                    <footer class="product-footer mt-auto">
                        <strong class="product-price">S/ ${Number(product.precio).toFixed(2)}</strong>
                        <button class="btn btn-brand" type="button" data-add="${escapeHTML(product.id)}">Agregar</button>
                    </footer>
                </section>
            </section>
        </article>
    `;
}

function slug(value) {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-");
}

function escapeHTML(value) {
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
