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