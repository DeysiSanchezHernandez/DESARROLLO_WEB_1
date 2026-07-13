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

