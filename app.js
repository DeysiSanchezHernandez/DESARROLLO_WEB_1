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

    carrito.forEach((p, i) => {

        subtotal += p.precio * p.cantidad;

        html += `
        <div class="card p-3 mb-3 d-flex flex-row align-items-center gap-3">

            <img src="${p.img}" style="width:80px;height:80px;object-fit:cover;border-radius:10px;">

            <div class="flex-grow-1">

                <strong>${p.nombre}</strong><br>

                <small style="opacity:.7">${p.descripcion}</small><br>

                S/ ${p.precio}

                <div class="mt-2">
                    <button onclick="menos(${i})">-</button>
                    ${p.cantidad}
                    <button onclick="mas(${i})">+</button>
                    <button onclick="eliminar(${i})">🗑️</button>
                </div>

            </div>

        </div>
        `;
    });

    cont.innerHTML = html;

    actualizarTotal(subtotal);
}

/* ===============================
   EMBACES (CORRECTO FINAL)
=============================== */

function calcularEmbaces() {

    let total = 0;

    carrito.forEach(p => {

        let nombre = p.nombre.toLowerCase();

        // SOLO bebidas embotelladas NO pagan
        let sinEmbace =
            nombre.includes("coca") ||
            nombre.includes("inka") ||
            nombre.includes("agua");

        if (sinEmbace) return;

        total += 0.5 * p.cantidad;
    });

    return total;
}

/* ===============================
   TOTAL
=============================== */

function actualizarTotal(subtotal) {

    let embaces = calcularEmbaces();

    let total = subtotal + embaces;

    const cont = document.getElementById("resumenTotal");

    if (cont) {
        cont.innerHTML = `
            <p>Subtotal: S/ ${subtotal.toFixed(2)}</p>
            <p>Embaces: S/ ${embaces.toFixed(2)}</p>
            <h3 class="text-danger">Total: S/ ${total.toFixed(2)}</h3>
        `;
    }
}