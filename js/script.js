//VARIABLES
let imgPaperplane = document.querySelector('.imgPaperplane');
let txtPaperplane = document.querySelector('.txtPaperplane');
let gmPaperplane = document.querySelector('.gmPaperplane');
let firstOption = document.querySelector('#option-1');
let secondOption = document.querySelector('#option-2');
let thirdOption = document.querySelector('#option-3');
const loginSection = document.querySelector('#loginSection');
const paperplaneSection = document.querySelector('#paperplaneSection');
const profileSection = document.querySelector('#profileSection');
const loginForm = document.querySelector('#loginForm');
const loginName = document.querySelector('#name');
const loginCity = document.querySelector('#city');
const displayName = document.querySelector('#displayName');
const logoutBtn = document.querySelector("#logoutBtn");

// RECUPERO OBJETO DE LOCALSTORAGE USANDO JSON
let user = JSON.parse(localStorage.getItem('user'));
console.log(user);

// PAPERPLANES desde JSON

const paperplanes = [{
    "quote": "Al final del camino me dirán: ¿Has vivido? ¿Has amado? Y yo, sin decir nada, abriré el corazón lleno de nombres",
    "source": "Pedro Casaldáliga",
    "options": ["Pedro Casaldáliga", "San Antonio de Padua", "Santa Faustina Kowalska"],
    "category": "Amor",
    "img": "img-01"
},
{
    "quote": "Y me dijo el Señor que quería que yo fuera un nuevo loco en el mundo",
    "source": "San Francisco de Asís",
    "options": ["San Francisco de Asís", "San Agustín", "San Bernardo"],
    "category": "Entrega",
    "img": "img-02"
},
{
    "quote": "Rezar el Rosario es contemplar con María el rostro de Cristo",
    "source": "San Juan Pablo II",
    "options": ["San Pio de Pietrelcina", "Santa Catalina de Siena", "San Juan Pablo II"],
    "category": "María",
    "img": "img-03"
},
{
    "quote": "En su bondad infinita, jamás abandona Dios a aquellos que no le quieren abandonar a Él.",
    "source": "San Francisco de Sales",
    "options": ["San Pablo", "San Francisco de Sales", "Santa Inés"],
    "category": "Amor",
    "img": "img-04"
},
{
    "quote": "La santidad no es otra cosa sino una respuesta de amor al anuncio del amor",
    "source": "Padre Ignacio Larrañaga",
    "options": ["Beato Carlo Acutis", "Beata Chiara Badano", "Padre Ignacio Larrañaga"],
    "category": "Santidad",
    "img": "img-05"
},
{
    "quote": "Dios extiende sus manos en la Cruz para abrazar hasta los confines del universo",
    "source": "San Cirilo de Jerusalén ",
    "options": ["San Pio de Pietrelcina", "San Cirilo de Jerusalén", "San Agustín"],
    "category": "Amor",
    "img": "img-06"
},
{
    "quote": "Ser libre en el amor es su completa y total realización",
    "source": "Viviana Ruffener",
    "options": ["Padre Ignacio Larrañaga", "Viviana Ruffener", "Pedro Casaldáliga"],
    "category": "Amor",
    "img": "img-07"
},
{
    "quote": "Te buscaba afuera, Señor, y tú estabas dentro de mi, en mi corazón...",
    "source": "San Agustín",
    "options": ["San Agustín", "Santo Tomás de Aquino", "San Juan Pablo II"],
    "category": "Amor",
    "img": "img-08"
},
{
    "quote": "Mira la estrella e invoca a María, porque un hijo de María nunca perecedera",
    "source": "San Bernardo",
    "options": ["San Francisco de Asís", "San Francisco de Sales", "San Bernardo"],
    "category": "María",
    "img": "img-09"
},
{
    "quote": "La paz comienza con una sonrisa",
    "source": "Santa Teresa de Calcuta",
    "options": ["Santa Inés", "Santa Teresa de Lisieux", "Santa Teresa de Calcuta"],
    "category": "Santidad",
    "img": "img-10"
}];


class Paperplane {
    constructor(paperplane) {
        this.quote = paperplane.quote;
        this.source = paperplane.source;
        this.options = paperplane.options;
        this.category = paperplane.category;
        this.img = paperplane.img;
    }
}

class User {
    constructor(user) {
        this.name = user.name;
        this.city = user.city;
    }
}

paperplanesList = []

for (const paperplane of paperplanes) {
    // USO DE PROPIEDAD PUSH
    paperplanesList.push(new Paperplane(paperplane));
}

function getRandPaperplane() {
    //GET RANDOM PAPERPLANE
    let index = Math.round(Math.random() * (paperplanesList.length - 1));
    console.log(index);

    // DESNORMALIZACION / DESESTRUCTURACION
    const {quote, source, options, category, img} = paperplanesList[index];
    
    //INNER HTML
    imgPaperplane.innerHTML = `
    <img src="assets/img/${img}.png">
    </div>`;
    
    txtPaperplane.innerHTML = `
    <h3>"${quote}"</h3>
    <h5>Categoría: ${category}</h5>
    `;

    gmPaperplane.innerHTML = `
    <h3 id="titleGame">¡Juguemos!</h3>
    <h4 id="descriptionGame">Adivina quién es el autor de esta frase</h4>
    `;

    firstOption.innerHTML = `${options[0]}`;
    
    secondOption.innerHTML = `${options[1]}`;
    
    thirdOption.innerHTML = `${options[2]}`;
    
    // EVENTOS
    firstOption.onclick = (e) => verification(firstOption.textContent, source);
    secondOption.onclick = (e) => verification(secondOption.textContent, source);
    thirdOption.onclick = (e) => verification(thirdOption.textContent, source);
}

const verification = (selected, correct) => {
    // CORRECT
    if(selected === firstOption.textContent && selected === correct) {
        showResult(firstOption, true);
    } else if(selected === secondOption.textContent && selected === correct) {
        showResult(secondOption, true);
    } else if(selected === thirdOption.textContent && selected === correct) {
        showResult(thirdOption, true);
    }
    // INCORRECT
    else if(selected === firstOption.textContent && selected !== correct) {
        showResult(firstOption, false);
    } else if(selected === secondOption.textContent && selected !== correct) {
        showResult(secondOption, false);
    } else if(selected === thirdOption.textContent && selected !== correct) {
        showResult(thirdOption, false);
    } 

    descriptionGame.innerHTML = `La respuesta correcta es ${correct}`;

    // DISABLED BUTTONS
    firstOption.disabled = true;
    secondOption.disabled = true;
    thirdOption.disabled = true;
}

// USO DE TERNARIOS PARA DETERMINAR EL RESULTADO
const showResult = (optionSelected, isCorrect) => {
    titleGame.innerHTML = isCorrect ? `¡Has acertado!` : `¡Estuviste cerca!`;
    optionSelected.className = isCorrect ? "correct" : "incorrect";
}

const login = () => {
    loginSection.classList.add("invisible");
    paperplaneSection.classList.remove("invisible");
    profileSection.classList.remove("invisible");
    displayName.innerHTML = `${user.name}`
}

const logout = () => {
    localStorage.removeItem('user');
    location.reload();
}

// EVENTO DE LOGIN
loginForm.addEventListener('submit', (e) => {
    // evita que se refresque la pagina
    e.preventDefault();
    const user = [{"name": loginName.value, "city": loginCity.value}];
    localStorage.setItem('user', JSON.stringify(user[0]));
    if(!!user) {
        login();
    }
});

// EVENTO DE LOGOUT
logoutBtn.addEventListener('click', (e) => {
    logout();
});

// mantener la sesion iniciada
if(!!user) {
    login();
}

getRandPaperplane();