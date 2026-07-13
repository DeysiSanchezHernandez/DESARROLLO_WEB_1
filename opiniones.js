const REVIEW_KEY = "opinionesCabanita";

const defaults = [
    {
        nombre: "Juan Carlos Mendoza",
        comentario: "El sabor ahumado y las cremas son excelentes.",
        estrellas: 5,
        fecha: "Cliente frecuente",
    }
];

let reviews = JSON.parse(localStorage.getItem(REVIEW_KEY) || "null") || defaults;
    let rating = 0;
    function paintStars() {

    document.querySelectorAll("#selectorEstrellas [data-rating]").forEach((button)=>{
    button.classList.toggle("selected", Number(button.dataset.rating)<=rating);
    });
}

document.getElementById("selectorEstrellas") ?.addEventListener("click",(event)=>{

const button=event.target.closest("[data-rating]");

    if(!button)return;
    rating=Number(button.dataset.rating);
    paintStars();

});
