// ARRAYS DE AVIONCITOS DE PAPEL

// ESTE CODIGO YA COMIENZA A SER PARTE DEL PROYECTO FINAL,
// DONDE SE RECIBIRÁN AVIONCITOS DE PAPEL LOS CUALES CONTIENEN
// FRASES DE SANTOS, VERSÍCULOS, CANCIONES, ETC REFERIDOS A LA FE
// ESTO ES PARTE DEL PROYECTO "SER EUCARISTÍA" (ig: @sereucaristia).


const paperplanes = [
    {
        quote: "Al final del camino me dirán: ¿Has vivido? ¿Has amado? Y yo, sin decir nada, abriré el corazón lleno de nombres",
        source: "Pedro Casaldáliga",
        category: "Amor",
        img: "img-01",
    },
    {
        quote: "Y me dijo el Señor que quería que yo fuera un nuevo loco en el mundo",
        source: "San Francisco de Asís",
        category: "Entrega",
        img: "img-02",
    },
    {
        quote: "Rezar el Rosario es contemplar con María el rostro de Cristo",
        source: "San Juan Pablo II",
        category: "María",
        img: "img-03"
    },
    {
        quote: "En su bondad infinita, jamás abandona Dios a aquellos que no le quieren abandonar a Él.",
        source: "San Francisco de Sales",
        category: "Amor",
        img: "img-04",
    },
    {
        quote: "La santidad no es otra cosa sino una respuesta de amor al anuncio del amor",
        source: "Padre Ignacio Larrañaga",
        category: "Santidad",
        img: "img-05"
    },
    {
        quote: "Dios extiende sus manos en la Cruz para abrazar hasta los confines del universo",
        source: "San Cirilo de Jerusalén ",
        category: "Amor",
        img: "img-06"
    },
    {
        quote: "Ser libre en el amor es su completa y total realización",
        source: "Viviana Ruffener",
        category: "Amor",
        img: "img-07"
    },
    {
        quote: "Te buscaba afuera, Señor, y tú estabas dentro de mi, en mi corazón...",
        source: "San Agustín",
        category: "Amor",
        img: "img-08"
    },
    {
        quote: "Mira la estrella e invoca a María, porque un hijo de María nunca perecedera",
        source: "San Bernardo",
        category: "María",
        img: "img-09"
    },
    {
        quote: "La paz comienza con una sonrisa",
        source: "Santa Teresa de Calcuta",
        category: "Santidad",
        img: "img-10"
    },
]

class Paperplane {
    constructor(paperplane) {
        this.quote = paperplane.quote;
        this.source = paperplane.source;
        this.category = paperplane.category;
        this.img = paperplane.img;
    }

    getPaperplane() {
        alert(`El avioncito que recibiste contiene las siguientes palabras: \n\n"${this.quote}"\n\n${this.source} - ${this.category}`)

    }

}

paperplanesList = []

for (const paperplane of paperplanes) {
    // USO DE PROPIEDAD PUSH
    paperplanesList.push(new Paperplane(paperplane));
}

// GENERACION ALEATORIA DE AVIONCITO
function surprise() {
    let index = Math.round(Math.random() * paperplanesList.length);
    //paperplanesList[index].getPaperplane();

    //innerHTML
    let paperplane = document.querySelector('.paperplane');
    let imgPaperplane = document.createElement('div');
    let txtPaperplane = document.createElement('div');
    paperplane.innerHTML = `
    <div class="imgPaperplane">

    <img src="assets/img/${paperplanesList[index].img}.png">
    </div>
    <div class="txtPaperplane">
    <h1>${paperplanesList[index].quote}</h1>
    <h2>${paperplanesList[index].source}</h2>
    <h3>${paperplanesList[index].category}</h3>
    </div>
    `;

    
}

function filtCategory() {
    let comando = prompt("Escribe la categoría de la cual te gustaría recibir avioncitos: MARIA, AMOR, SANTIDAD, ENTREGA");
    let paperplane;
    switch (comando) {
        case "AMOR":
            paperplane = new Paperplane(paperplanes.find(paperplane => paperplane.category === 'Amor'));
            paperplane.getPaperplane();
            break;
        case "MARIA":
            paperplane = new Paperplane(paperplanes.find(paperplane => paperplane.category === 'María'));
            paperplane.getPaperplane();
            break;
        case "SANTIDAD":
            paperplane = new Paperplane(paperplanes.find(paperplane => paperplane.category === 'Santidad'));
            paperplane.getPaperplane();
            break;
        case "ENTREGA":
            paperplane = new Paperplane(paperplanes.find(paperplane => paperplane.category === 'Entrega'));
            paperplane.getPaperplane();
            break;
    }
}

// FUNCIONES
function menu() {

    alert(`AVIONCITOS DE PAPEL - SER EUCARISTÍA\nHola, hay ${paperplanesList.length} avioncitos de papel esperando a ser descubiertos. Escribe un comando y dejate abrazar\n\nCOMANDOS:\n- SORPRENDEME. Seleccionaremos un avioncito al azar para vos.\n- DEJARME ELEGIR. Escribe una categoría y te mostraremos un avioncito que pertenezca.`);
    let comando = prompt("Escribe un comando:");

    switch (comando) {
        case "SORPRENDEME":
            surprise();
            break;
        case "DEJARME ELEGIR":
            filtCategory();
            break;
    }
}
menu();