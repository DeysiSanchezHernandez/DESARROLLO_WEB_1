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