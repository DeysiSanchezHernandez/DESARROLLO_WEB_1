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

function submitReview(event){ event.preventDefault(); 
    const name= document.getElementById("nombreOpinion").value.trim();
    const comment=document.getElementById("comentarioOpinion").value.trim();
    if(name.length<2 || comment.length<10 || !rating){
    return;
    }

    reviews.unshift({
        nombre: name,
        comentario: comment,
        estrellas: rating,
        fecha: new Date().toLocaleDateString("es-PE"),

        reviews=reviews.slice(0,20);
        localStorage.setItem(
        REVIEW_KEY,
        JSON.stringify(reviews)
        )
    });
    }

    document.getElementById("formOpinion") ?.addEventListener(
        "submit",
        submitReview
    );

groupReviews()

renderReviews()

createReviewCard()


function updateReviewsAverage() {
    const numberElement = document.getElementById("promedioNumero");

    const starsElement = document.getElementById("promedioEstrellas");

    const textElement = document.getElementById("promedioTexto");

    if (!numberElement || !starsElement || !textElement) {
        return;
    }

    if (!reviews.length) {
        numberElement.textContent = "0.0";
        starsElement.textContent = "☆☆☆☆☆";
        starsElement.setAttribute("aria-label", "Sin calificaciones");
        textElement.textContent = "Sin calificaciones todavía";
        return;
    }

    const totalStars = reviews.reduce((sum, review) => sum + Number(review.estrellas || 0), 0);

    const average = totalStars / reviews.length;

    const roundedAverage = Math.round(average * 10) / 10;

    const fullStars = Math.floor(average);

    const hasHalfStar = average - fullStars >= 0.5;

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    numberElement.textContent = roundedAverage.toFixed(1);

    starsElement.innerHTML = [
        "★".repeat(fullStars),
        hasHalfStar ? '<span class="half-star" aria-hidden="true">★</span>' : "",
        "☆".repeat(emptyStars),
    ].join("");

    starsElement.setAttribute("aria-label", `${roundedAverage.toFixed(1)} de 5 estrellas`);

    textElement.textContent = `${reviews.length} opinión${reviews.length === 1 ? "" : "es"} registrada${reviews.length === 1 ? "" : "s"}`;
}

