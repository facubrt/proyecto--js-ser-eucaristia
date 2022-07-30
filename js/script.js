//VARIABLES AVIONCITOS
let img1Pplane = document.querySelector('#img-1');
let txt1Pplane = document.querySelector('#txt-1');
let gm1Pplane = document.querySelector('#gm-1');
let option11 = document.querySelector('#option1-1');
let option12 = document.querySelector('#option1-2');
let option13 = document.querySelector('#option1-3');
//
let img2Pplane = document.querySelector('#img-2');
let txt2Pplane = document.querySelector('#txt-2');
let gm2Pplane = document.querySelector('#gm-2');
let option21 = document.querySelector('#option2-1');
let option22 = document.querySelector('#option2-2');
let option23 = document.querySelector('#option2-3');
//
let img3Pplane = document.querySelector('#img-3');
let txt3Pplane = document.querySelector('#txt-3');
let gm3Pplane = document.querySelector('#gm-3');
let option31 = document.querySelector('#option3-1');
let option32 = document.querySelector('#option3-2');
let option33 = document.querySelector('#option3-3');
//
let img4Pplane = document.querySelector('#img-4');
let txt4Pplane = document.querySelector('#txt-4');
let gm4Pplane = document.querySelector('#gm-4');
let option41 = document.querySelector('#option4-1');
let option42 = document.querySelector('#option4-2');
let option43 = document.querySelector('#option4-3');
//
let img5Pplane = document.querySelector('#img-5');
let txt5Pplane = document.querySelector('#txt-5');
let gm5Pplane = document.querySelector('#gm-5');
let option51 = document.querySelector('#option5-1');
let option52 = document.querySelector('#option5-2');
let option53 = document.querySelector('#option5-3');

let txtEnd = document.querySelector('#txtEnd');

//VARIABLES
const loginSection = document.querySelector('#loginSection');
const paperplaneSection = document.querySelector('#paperplaneSection');
const profileSection = document.querySelector('#profileSection');
const paginationSection = document.querySelector('#paginationSection');
const loginForm = document.querySelector('#loginForm');
const loginName = document.querySelector('#name');
const loginCity = document.querySelector('#city');
const displayName = document.querySelector('#displayName');
const score = document.querySelector('#score');
const currentPage = document.querySelector('#currentPage');
const logoutBtn = document.querySelector("#logoutBtn");
const restartBtn = document.querySelector("#restartBtn");

// MAXIMO NUMERO DE PAGINAS
const MAX_PAGE = 6;

// RECUPERO OBJETO DE LOCALSTORAGE USANDO JSON
let user = JSON.parse(localStorage.getItem('user'));
let best = JSON.parse(localStorage.getItem('best'));
let paperplane = JSON.parse(localStorage.getItem('paperplane'));
let page = JSON.parse(localStorage.getItem('page'));

let newPaperplane = false;

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
        this.score = user.score;
    }
}


// FUNCION INICIAL - MAIN
async function initGame() {

    // ACTUALIZA SLIDES CUANDO SE RECARGA LA PAGINA
    let data = window.performance.getEntriesByType("navigation")[0].type;
    if (data === 'reload') {
        swiper.slideTo(page - 1, 1);
    }
    paperplanesList = [];
    // FETCH DESDE ARCHIVO LOCAL JSON
    const respuesta = await fetch('/paperplanes.json');
    const paperplanes = await respuesta.json();

    for (const paperplane of paperplanes) {
        // USO DE PROPIEDAD PUSH
        paperplanesList.push(new Paperplane(paperplane));
    }

    if (!page) {
        page = 1;
        localStorage.setItem('page', JSON.stringify(page));
    }
    getRandPaperplane();
};

function getRandPaperplane() {
    let index;
    let imgPplane, txtPplane, gmPplane, titleGame, option1, option2, option3;

    if (!paperplane || newPaperplane) {
        //GET RANDOM PAPERPLANE
        index = Math.round(Math.random() * (paperplanesList.length - 1));
        paperplane = paperplanesList[index];
        localStorage.setItem('paperplane', JSON.stringify(paperplane));
    }

    // DOM
    const pplane = document.createElement('div');
    pplane.className = "paperplane"

    switch (page) {
        case 1: {
            imgPplane = img1Pplane;
            txtPplane = txt1Pplane;
            gmPplane = gm1Pplane;
            titleGame = 'title1Game';
            descriptionGame = 'description1Game';
            option1 = option11;
            option2 = option12;
            option3 = option13;
            break;
        }
        case 2: {
            imgPplane = img2Pplane;
            txtPplane = txt2Pplane;
            gmPplane = gm2Pplane;
            titleGame = 'title2Game';
            descriptionGame = 'description2Game';
            option1 = option21;
            option2 = option22;
            option3 = option23;
            break;
        }
        case 3: {
            imgPplane = img3Pplane;
            txtPplane = txt3Pplane;
            gmPplane = gm3Pplane;
            titleGame = 'title3Game';
            descriptionGame = 'description3Game';
            option1 = option31;
            option2 = option32;
            option3 = option33;
            break;
        }
        case 4: {
            imgPplane = img4Pplane;
            txtPplane = txt4Pplane;
            gmPplane = gm4Pplane;
            titleGame = 'title4Game';
            descriptionGame = 'description4Game';
            option1 = option41;
            option2 = option42;
            option3 = option43;
            break;
        }
        case 5: {
            imgPplane = img5Pplane;
            txtPplane = txt5Pplane;
            gmPplane = gm5Pplane;
            titleGame = 'title5Game';
            descriptionGame = 'description5Game';
            option1 = option51;
            option2 = option52;
            option3 = option53;
            break;
        }
        case 6: {
            showScoreTable();
            break;
        }
        default: {
            console.log("error de indice");
        }
    }

    imgPplane.innerHTML = `
    <img src="assets/img/${paperplane.img}.png">
    </div>`;

    txtPplane.innerHTML = `
    <h3>"${paperplane.quote}"</h3>
    <h5>Categoría: ${paperplane.category}</h5>
    `;

    gmPplane.innerHTML = `
    <h4 id="${titleGame}">¡Juguemos!</h4>
    <p id="${descriptionGame}">Adivina quién es el autor de esta frase</p>
    `;

    option1.innerHTML = `${paperplane.options[0]}`;
    option2.innerHTML = `${paperplane.options[1]}`;
    option3.innerHTML = `${paperplane.options[2]}`;

    // EVENTOS
    option1.onclick = (e) => verification(option1, paperplane.source);
    option2.onclick = (e) => verification(option2, paperplane.source);
    option3.onclick = (e) => verification(option3, paperplane.source);
}

const verification = (selected, correct) => {
    // CORRECTO
    if (selected.textContent === correct) {
        showResult(selected, true);
        updateScore();
    }
    // INCORRECTO
    else if (selected.textContent !== correct) {
        showResult(selected, false);
    }

    // DESHABILITO BOTONES
    switch (page) {
        case 1: {
            description1Game.innerHTML = `La respuesta correcta es ${correct}`;
            option11.disabled = true;
            option12.disabled = true;
            option13.disabled = true;
            nextPplane();
            break;
        }
        case 2: {
            description2Game.innerHTML = `La respuesta correcta es ${correct}`;
            option21.disabled = true;
            option22.disabled = true;
            option23.disabled = true;
            nextPplane();
            break;
        }
        case 3: {
            description3Game.innerHTML = `La respuesta correcta es ${correct}`;
            option31.disabled = true;
            option32.disabled = true;
            option33.disabled = true;
            nextPplane();
            break;
        }
        case 4: {
            description4Game.innerHTML = `La respuesta correcta es ${correct}`;
            option41.disabled = true;
            option42.disabled = true;
            option43.disabled = true;
            nextPplane();
            break;
        }
        case 5: {
            description5Game.innerHTML = `La respuesta correcta es ${correct}`;
            option51.disabled = true;
            option52.disabled = true;
            option53.disabled = true;
            endGame();
            break;
        }
        default: {
            console.log("error de indice en verificacion");
        }
    }
}

const nextPplane = () => {
    // PASAR AL SIGUIENTE AVIONCITO
    newPaperplane = true;
    page++;
    localStorage.setItem('page', JSON.stringify(page));
    getRandPaperplane();
    setTimeout(() => {
        swiper.slideNext(600, true);
        currentPage.innerHTML = `${String(page).padStart(2, '0')} / 05`
    }, 1500)
}

// USO DE TERNARIOS PARA DETERMINAR EL RESULTADO
const showResult = (optionSelected, isCorrect) => {

    switch (page) {
        case 1: {
            title1Game.innerHTML = isCorrect ? `¡Has acertado!` : `¡Estuviste cerca!`;
            break;
        }
        case 2: {
            title2Game.innerHTML = isCorrect ? `¡Has acertado!` : `¡Estuviste cerca!`;
            break;
        }
        case 3: {
            title3Game.innerHTML = isCorrect ? `¡Has acertado!` : `¡Estuviste cerca!`;
            break;
        }
        case 4: {
            title4Game.innerHTML = isCorrect ? `¡Has acertado!` : `¡Estuviste cerca!`;
            break;
        }
        case 5: {
            title5Game.innerHTML = isCorrect ? `¡Has acertado!` : `¡Estuviste cerca!`;
            break;
        }
    }
    optionSelected.className = isCorrect ? "correct" : "incorrect";
}

// ACTUALIZACION DE PUNTOS
const updateScore = () => {
    user.score += 5;
    localStorage.setItem('user', JSON.stringify(user));
    score.innerHTML = `${user.score} puntos`;
}

// FINAL DEL JUEGO
const endGame = () => {
    page++;
    localStorage.setItem('page', JSON.stringify(page));
    if (!!best) {
        if (user.score >= best.score) {
            localStorage.setItem('best', JSON.stringify(user));
            best = user;
        }
    } else {
        localStorage.setItem('best', JSON.stringify(user));
        best = user;
    }
    showScoreTable();
    setTimeout(() => {
        swiper.slideNext(600, true);
        currentPage.innerHTML = `FIN`
    }, 1500)
}

const showScoreTable = () => {

    txtEnd.innerHTML = `
    <h3>¡Felicitaciones ${user.name}, has terminado el juego!</h3>
    <p>Tu puntuación</p>
    <div class="scoreTable">
    <p>${user.name}</p>
    <p>${user.city}</p>
    <p>${user.score}</p>
    </div>
    <p>Mejor puntuación</p>
    <div class="scoreTable">
    <p>${best.name}</p>
    <p>${best.city}</p>
    <p>${best.score}</p>
    </div>
    `;
}

// INICIO DE SESION
const login = () => {
    loginSection.classList.add("invisible");
    paperplaneSection.classList.remove("invisible");
    profileSection.classList.remove("invisible");
    paginationSection.classList.remove("invisible");
    displayName.innerHTML = `${user.name}`;
    score.innerHTML = `${user.score} puntos`;
    if(page < MAX_PAGE) {
        currentPage.innerHTML = `${String(page).padStart(2, '0')} / 05`;
    } else {
        currentPage.innerHTML = `FIN`;
    }

}

// SALIR DEL JUEGO
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('page');
    localStorage.removeItem('paperplane');
    location.reload();
}

// REINICIAR JUEGO
const restart = () => {
    user.score = 0;
    page = 1;
    localStorage.setItem('page', JSON.stringify(page));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.removeItem('paperplane');
    location.reload();
}

// EVENTO DE LOGIN
loginForm.addEventListener('submit', (e) => {
    // evita que se refresque la pagina
    e.preventDefault();
    const newUser = [{ "name": loginName.value, "city": loginCity.value, "score": 0 }];
    localStorage.setItem('user', JSON.stringify(newUser[0]));
    user = newUser[0]
    if (!!user) {
        login();
    }
});

// EVENTO DE LOGOUT
logoutBtn.addEventListener('click', (e) => {
    logout();
});

// EVENTO DE RESTART
restartBtn.addEventListener('click', (e) => {
    restart();
});

// MANTIENE SESION INICIADA
if (!!user) {
    login();
}

// INCORPORACION DE LIBRERIA SWIPER JS
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    effect: 'cards',
    allowTouchMove: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// MAIN
initGame();