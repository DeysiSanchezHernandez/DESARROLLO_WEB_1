"use strict";

let catalog = [];

document.addEventListener("DOMContentLoaded", initCart);


function cartActions(event) {
    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const cart = getCart();
    const item = cart.find((product) => product.id === button.dataset.id);

    if (!item) {
        return;
    }

    if (button.dataset.action === "plus") {
        item.cantidad += 1;
    }

    if (button.dataset.action === "minus") {
        item.cantidad -= 1;
    }

    if (button.dataset.action === "remove") {
        item.cantidad = 0;
    }

    saveCart(cart.filter((product) => product.cantidad > 0));
    renderCart();
}


function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById("cartItems");
    const resumen = document.getElementById("resumenTotal");

    if (!cart.length) {
        cartItems.innerHTML = `
            <article class="review-form text-center">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos desde nuestro menú.</p>
                <a class="btn btn-brand" href="menu.html">Ver menú</a>
            </article>
        `;

        resumen.innerHTML = `
            <p class="total-line">
                <span>Total</span>
                <strong>S/ 0.00</strong>
            </p>
        `;

        return;
    }

    let subtotal = 0;

    cartItems.innerHTML = cart
        .map((item) => {
            const product = catalog.find((candidate) => candidate.id === item.id);

            if (!product) {
                return "";
            }

            const itemTotal = product.precio * item.cantidad;
            subtotal += itemTotal;

            return `
            <article class="cart-item">
                <figure class="cart-item-media">
                    <img src="${escapeHTML(product.imagen)}" alt="${escapeHTML(product.nombre)}">
                </figure>
                <section class="cart-item-info">
                    <h3>${escapeHTML(product.nombre)}</h3>
                    <p>S/ ${Number(product.precio).toFixed(2)} c/u</p>
                    <button class="cart-remove" type="button" data-action="remove" data-id="${escapeHTML(product.id)}">Eliminar</button>
                </section>
                <aside class="cart-item-actions">
                    <nav class="quantity" aria-label="Cantidad de ${escapeHTML(product.nombre)}">
                        <button type="button" data-action="minus" data-id="${escapeHTML(product.id)}" aria-label="Disminuir cantidad">−</button>
                        <strong>${item.cantidad}</strong>
                        <button type="button" data-action="plus" data-id="${escapeHTML(product.id)}" aria-label="Aumentar cantidad">+</button>
                    </nav>
                    <strong class="cart-line-total">S/ ${itemTotal.toFixed(2)}</strong>
                </aside>
            </article>
        `;
        })
        .join("");

    const envases = calculateContainers(cart);
    const total = subtotal + envases;

    resumen.innerHTML = `
        <p class="total-line">
            <span>Subtotal</span>
            <strong>S/ ${subtotal.toFixed(2)}</strong>
        </p>

        <p class="total-line">
            <span>Envases</span>
            <strong>S/ ${envases.toFixed(2)}</strong>
        </p>

        <p class="total-line grand-total">
            <span>Total referencial</span>
            <strong>S/ ${total.toFixed(2)}</strong>
        </p>
    `;
}
function toggleDeliveryFields() {
    const tipoEntrega = document.getElementById("tipoEntrega");
    const deliveryFields = document.getElementById("camposDelivery");
    const address = document.getElementById("clienteDireccion");
    const reference = document.getElementById("clienteReferencia");
    const isDelivery = tipoEntrega.value === "Delivery";

    deliveryFields.hidden = !isDelivery;
    address.required = isDelivery;
    reference.required = isDelivery;

    if (!isDelivery) {
        address.value = "";
        reference.value = "";
        address.classList.remove("is-invalid");
        reference.classList.remove("is-invalid");
    }
}

function toggleCashFields() {
    const method = document.getElementById("metodoPago").value;
    const fields = document.getElementById("camposEfectivo");
    const amount = document.getElementById("montoEfectivo");
    const isCash = method === "Efectivo";

    fields.hidden = !isCash;
    amount.required = isCash;

    if (!isCash) {
        amount.value = "";
        amount.classList.remove("is-invalid");
        document.getElementById("mensajeVuelto").textContent = "";
    }
}


function getCurrentTotal() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => {
        const product = catalog.find((candidate) => candidate.id === item.id);
        return sum + (product ? product.precio * item.cantidad : 0);
    }, 0);
    return subtotal + calculateContainers(cart);
}

function updateChange() {
    const amountField = document.getElementById("montoEfectivo");
    const message = document.getElementById("mensajeVuelto");
    const amount = Number(amountField.value);
    const total = getCurrentTotal();

    if (!amountField.value) {
        message.textContent = "";
        return;
    }

    if (amount < total) {
        message.textContent = `El monto es menor al total por S/ ${(total - amount).toFixed(2)}.`;
        message.className = "change-message error";
    } else {
        message.textContent = `Vuelto aproximado: S/ ${(amount - total).toFixed(2)}.`;
        message.className = "change-message success";
    }
}


function validateCustomerForm() {
    const form = document.getElementById("formPedido");
    const message = document.getElementById("mensajePedido");
    const requiredFields = [...form.querySelectorAll("[required]")];
    let firstInvalid = null;

    requiredFields.forEach((field) => {
        const isValid = field.checkValidity();
        field.classList.toggle("is-invalid", !isValid);

        if (!isValid && !firstInvalid) {
            firstInvalid = field;
        }
    });

    const cashField = document.getElementById("montoEfectivo");
    if (
        document.getElementById("metodoPago").value === "Efectivo" &&
        Number(cashField.value) < getCurrentTotal()
    ) {
        cashField.classList.add("is-invalid");
        if (!firstInvalid) firstInvalid = cashField;
    }

    if (firstInvalid) {
        message.textContent = "Completa correctamente todos los campos obligatorios.";
        message.className = "form-message error mt-3 mb-0";
        firstInvalid.focus();
        return false;
    }

    message.textContent = "";
    message.className = "form-message mt-3 mb-0";
    return true;
}