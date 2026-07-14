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