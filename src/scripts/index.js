'use strict';
import '../styles/index.scss';

const elementInput = document.querySelector ('#inputSearch');
const elementForm = document.querySelector('#searchForm');
//const elementContainResults = document.querySelector ('#resultsContainer');
const elementButtonSearch= document.querySelector('#btnSearch');
const elementUlResults= document.querySelector('#resultList');
const api_key= 'bb6f51bef07465653c3e553d6ab161a8';
const urlBase = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;
const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/? text=TV.';



//conectar con la api

const conectSearchHandler = () =>{
    const inputSearchValue = elementInput.value.toLowerCase(); 
    fetch(urlBase + inputSearchValue)
    .then (response => response.json())
    .then (dataFromSearch => {
        showSearchResults(dataFromSearch);
        notFoundMessage(dataFromSearch);
    });
};
// funcion no encontrado

function notFoundMessage(data){
    if(data.results.length === 0){
        const elementNotFound = document.createElement('p');
        elementNotFound.setAttribute('class', 'error-message');
        elementNotFound.innerHTML= 'No results';
        elementUlResults.appendChild(elementNotFound);
    };
    
};

//pintar la lista de peliculas que sale de la búsqueda, se crea un <li> por cada item que nos llega de la API
function showSearchResults (data){
    const results= data.results;
 for (const result of results){
    const createElementLi = document.createElement ('li');
    createElementLi.classList.add('li__search');
    const createElementDiv= document.createElement('div');
    createElementDiv.setAttribute('class', 'img__container');
    const createElementImg = document.createElement ('img');
    const createElementTitle = document.createElement ('h3');
    createElementTitle.innerHTML= result.title;
   
    const createElementText= document.createElement('p');
    createElementText .setAttribute ('class', 'description__result');
    const elementTextHidden = document.createElement('p');
    elementTextHidden .setAttribute ('class', 'hidden');

    const createElementSpan= document.createElement('span');
    createElementSpan.setAttribute('class', 'result__date');

    const elementTextContainer= document.createElement('div');
    elementTextContainer.setAttribute('class', 'result__container-text');

    const readMoreLink= document.createElement('span');
    readMoreLink.innerHTML= 'Read more';
    readMoreLink.setAttribute('class', 'result__link-more');
    
    createElementDiv.appendChild(createElementImg);
    createElementLi.appendChild(createElementDiv);

    elementTextContainer.appendChild(createElementTitle);
    elementTextContainer.appendChild(createElementSpan);
    elementTextContainer.appendChild(createElementText);
    elementTextContainer.appendChild(elementTextHidden);
    elementTextContainer.appendChild(readMoreLink);

    createElementLi.appendChild(elementTextContainer);
    elementUlResults.appendChild(createElementLi); 
    
    defaultImage(result.poster_path, createElementImg);
    textLengt(result.overview, createElementText, elementTextHidden);
    transformDate(result.release_date, createElementSpan);
    readMoreInformation();
 };
};

//trasnformar fecha en formato mes, dia y año
function transformDate(dateMovie, spanDate){
    const months=[
        'January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'
    ];
    const date= new Date(dateMovie);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const fullDate= `${months[month]} ${day}, ${year}`;
    spanDate.innerHTML= fullDate;
};

//función que recorre todos los botones de Read more, para que se ejecute el evento en cada uno.  
function readMoreInformation(){
    const allBtnRead= document.querySelectorAll('.result__link-more');
    for (const button of allBtnRead) {
        button.addEventListener('click', addMore);
    }  
};
// función que hace que se despiliege más infomación al pulsar al Read More
function addMore(event){
    const elementReadMore= event.currentTarget;

    if(elementReadMore.innerHTML === 'Read more'){
        elementReadMore.innerHTML = 'Read less';
    }else{
        elementReadMore.innerHTML = 'Read more';
    };
    const elementPHidden = event.currentTarget.previousSibling;
    const elementPVisible = elementPHidden.previousSibling;
    elementPHidden.classList.toggle('hidden');
    elementPVisible.classList.toggle('hidden');
    const eventLiParent= event.currentTarget.closest('li');
    eventLiParent.classList.toggle('new-size');
}
// longitud de parrafo
function textLengt(text, innerP, hiddenText){
    if(text.length > 100){
        const textVisible= text.substr(0, 140) + '...';
        innerP.innerHTML= textVisible;
        hiddenText.innerHTML = text;
    }
};
//función para poner imagen por defecto, en el caso de que la ruta de la api sea null
function defaultImage(pathImage, elementImg){
    if(pathImage== null){
        elementImg.src = imgDefault;
    }else{
        elementImg.src= `https://image.tmdb.org/t/p/w500/${pathImage}`;
    }
}
//funcion nueva búsqueda
function removeSearch() {
    if(elementUlResults.innerHTML !== ''){
        elementUlResults.innerHTML = '';
    }
};

//funcion para que funcione la busqueda con el evento enter
function enterKeySearchHandler (event){
    event.preventDefault();
    conectSearchHandler();
};


elementInput.addEventListener ('change',removeSearch);
elementForm.addEventListener ('submit', enterKeySearchHandler );
elementButtonSearch.addEventListener('click', conectSearchHandler);