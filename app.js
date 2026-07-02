let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
                    <button onclick="eliminar(${i})">🗑</button>
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

        // ❌ SOLO bebidas embotelladas NO pagan
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


/* ===============================
   CONTROL CARRITO
=============================== */

function mas(i) {
    carrito[i].cantidad++;
    guardar();
}

function menos(i) {
    if (carrito[i].cantidad > 1) carrito[i].cantidad--;
    guardar();
}

function eliminar(i) {
    carrito.splice(i, 1);
    guardar();
}

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}


/* ===============================
   MÉTODO DE PAGO (MENSAJES FIX)
=============================== */

document.addEventListener("change", (e) => {

    if (e.target.id !== "pago") return;

    const info = document.getElementById("infoPago");
    const monto = document.getElementById("monto");

    let val = e.target.value;

    if (!info) return;

    if (val === "yape") {
        info.innerText = "Yape: 999 888 777 - Juan Pérez";
        monto.classList.add("d-none");
    }

    else if (val === "plin") {
        info.innerText = "Plin: 999 888 777 - Juan Pérez";
        monto.classList.add("d-none");
    }

    else if (val === "tarjeta") {
        info.innerText = "Tarjeta Visa/Mastercard - pago al recibir";
        monto.classList.add("d-none");
    }

    else if (val === "efectivo") {
        info.innerText = "Pago en efectivo al recibir";
        monto.classList.remove("d-none");
    }

    else {
        info.innerText = "";
        monto.classList.add("d-none");
    }
});


/* ===============================
   ENVIAR WHATSAPP (FORMATO LIMPIO)
=============================== */

function enviarPedido() {

    let campos = ["nombre", "telefono", "entrega", "pago"];

    for (let id of campos) {
        let el = document.getElementById(id);
        if (!el || el.value.trim() === "") {
            alert("Completa todos los campos obligatorios");
            return;
        }
    }

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let referencia = document.getElementById("referencia").value;
    let entrega = document.getElementById("entrega").value;
    let pago = document.getElementById("pago").value;
    let detalles = document.getElementById("detalles").value;

    let dinero = parseFloat(document.getElementById("monto")?.value) || 0;

    let subtotal = carrito.reduce((a, b) => a + b.precio * b.cantidad, 0);
    let embaces = calcularEmbaces();
    let total = subtotal + embaces;

    let vuelto = dinero - total;

    let msg = `*NUEVO PEDIDO*\n\n`;

    msg += `*Nombre:* ${nombre}\n`;
    msg += `*Telefono:* ${telefono}\n`;

    if (entrega === "delivery") {
        msg += `*Direccion:* ${direccion}\n`;
        msg += `*Referencia:* ${referencia}\n`;
    } else {
        msg += `*Tipo:* RECOJO EN LOCAL\n`;
    }

    msg += `\n*Metodo de pago:* ${pago}\n`;
    msg += `*Observaciones:* ${detalles}\n\n`;

    msg += `*TOTAL:* S/ ${total.toFixed(2)}\n\n`;

if (pago === "efectivo") {

    msg += `*Dinero recibido:* S/ ${dinero.toFixed(2)}\n`;
    msg += `*Vuelto:* S/ ${vuelto.toFixed(2)}\n\n`;

} else {

    msg += `*IMPORTANTE:* No olvidar enviar captura de pago para confirmar el pedido\n\n`;
}

    msg += `*DETALLE DEL PEDIDO:*\n`;

    carrito.forEach(p => {
        msg += `- ${p.nombre} x${p.cantidad}\n`;
    });

    window.open(
        "https://wa.me/51930838877?text=" + encodeURIComponent(msg),
        "_blank"
    );
}


/* ===============================
   INIT
=============================== */

document.addEventListener("DOMContentLoaded", renderCarrito);