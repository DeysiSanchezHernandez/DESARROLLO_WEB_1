let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

document.addEventListener("DOMContentLoaded", actualizarContador);

/* ===============================
   AGREGAR PRODUCTOS
=============================== */

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("btn-cabanita")) return;

    const card = e.target.closest(".card");
    if (!card) return;

    const nombre = card.querySelector(".card-title")?.innerText?.trim();
    const descripcion = card.querySelector(".card-text")?.innerText?.trim() || "";
    const img = card.querySelector("img")?.src || "";
    
    let precioTexto =
    card.querySelector(".fs-4")?.innerText ||
    card.querySelector(".text-dark")?.innerText ||
    "0";

    let precio = parseFloat(precioTexto.replace(/[^\d.]/g, ""));

    let existe = carrito.find(p => p.nombre === nombre);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            nombre,
            descripcion,
            precio,
            cantidad: 1,
            img
        });
    }

    guardar();
    function actualizarContador() {
    const badge = document.getElementById("cartCount");
    if (!badge) return;

    const totalItems = carrito.reduce((total, p) => total + p.cantidad, 0);
    badge.innerText = totalItems;
}
});


/* ===============================
   RENDER CARRITO
=============================== */

function renderCarrito() {

    const cont = document.getElementById("cartItems");
    if (!cont) return;

    let html = "";
    let subtotal = 0;

    carrito.forEach((p) => {
        subtotal += p.precio * p.cantidad;

        html += `
        <div class="card p-3 mb-3">
            <strong>${p.nombre}</strong><br>
            S/ ${p.precio} x ${p.cantidad}
        </div>
        `;
    });

    cont.innerHTML = html;

    actualizarTotal(subtotal);
}

function actualizarTotal(subtotal) {
    const cont = document.getElementById("resumenTotal");

    if (cont) {
        cont.innerHTML = `
            <p>Subtotal: S/ ${subtotal.toFixed(2)}</p>
        `;
    }
}