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