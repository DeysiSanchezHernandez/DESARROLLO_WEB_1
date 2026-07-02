let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}