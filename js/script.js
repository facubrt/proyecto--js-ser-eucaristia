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

// CLASES
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


// FUNCION INICIAL - MAIN
async function initGame () {
    paperplanesList = [];
    // FETCH DESDE ARCHIVO LOCAL JSON
    const respuesta = await fetch('/paperplanes.json');
    const paperplanes = await respuesta.json();

    for (const paperplane of paperplanes) {
        // USO DE PROPIEDAD PUSH
        paperplanesList.push(new Paperplane(paperplane));
    }

    getRandPaperplane();
};

function getRandPaperplane(slide) {
    //GET RANDOM PAPERPLANE
    let index = Math.round(Math.random() * (paperplanesList.length - 1));

    // DESNORMALIZACION / DESESTRUCTURACION
    const {quote, source, options, category, img} = paperplanesList[index];
    
    //INNER HTML
    const pplane = document.createElement('div');
    pplane.className = "paperplane"
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
    
    // PASAR AL SIGUIENTE AVIONCITO luego de un breve tiempo
    setTimeout(() => {
        swiper.slideNext(300, true);
    }, 1000)

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
    displayName.innerHTML = `${user.name}`;
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

// INCORPORACION DE LIBRERIA SWIPER JS
const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false, 
    effect: 'cards',
    allowTouchMove: false,
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    

  });

initGame();