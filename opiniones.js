const REVIEW_KEY = "opinionesCabanita";

const defaults = [
    {
        nombre: "Juan Carlos Mendoza",
        comentario: "El sabor ahumado y las cremas son excelentes.",
        estrellas: 5,
        fecha: "Cliente frecuente",
    }
];

let reviews =
JSON.parse(localStorage.getItem(REVIEW_KEY) || "null")
||
defaults;