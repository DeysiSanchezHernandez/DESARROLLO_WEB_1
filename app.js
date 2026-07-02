let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* ===============================
   AGREGAR PRODUCTOS
=============================== */

document.addEventListener("click", (e) => {

    if (!e.target.classList.contains("btn-cabanita")) return;

    const card = e.target.closest(".card");
    if (!card) return;

    const nombre = card.querySelector(".card-title")?.innerText?.trim();

    let precioTexto =
        card.querySelector(".fs-4")?.innerText ||
        card.querySelector(".text-dark")?.innerText ||
        "0";

    let precio = parseFloat(precioTexto.replace(/[^\d.]/g, ""));

    carrito.push({
        nombre,
        precio,
        cantidad: 1
    });

    guardar();
});