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
