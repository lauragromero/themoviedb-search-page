'use strict';

import '../styles/index.scss';

const elementInput = document.querySelector ('#inputSearch');
const elementForm = document.querySelector('#searchForm');
const elementButtonSearch= document.querySelector('#btnSearch');
const elementUlResults= document.querySelector('#resultList');
const api_key= 'bb6f51bef07465653c3e553d6ab161a8';
const urlBase = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;
const imgDefault = 'https://via.placeholder.com/210x295/ffffff/666666/? text=TV.';

//conectar con la api
function conectSearchHandler (){
    const inputSearchValue = elementInput.value.toLowerCase(); 
    fetch(urlBase + inputSearchValue)
    .then (response => response.json())
    .then (dataFromSearch => {
        showSearchResults(dataFromSearch);
        notFoundMessage(dataFromSearch);
    });
};

// función para que que el caso de que no encuentre resultados se muestre un mensaje
function notFoundMessage(data){
    if(data.results.length === 0){
        const elementNotFound = document.createElement('p');
        elementNotFound.setAttribute('class', 'error-message');
        elementNotFound.innerHTML= 'No results';
        elementUlResults.appendChild(elementNotFound);
    };  
};

//pintar la lista de películas que nos da la api de la búsqueda
function showSearchResults (data){
    const results= data.results;
 for (const result of results){
    //se crea un elemento <li>
    const createElementLi = document.createElement ('li');
    createElementLi.classList.add('li__search');
    //se crea un elemento <div> para contener a la imagen
    const createElementDiv= document.createElement('div');
    createElementDiv.setAttribute('class', 'img__container');
    //se crea un elemento <img>
    const createElementImg = document.createElement ('img');
    //se crea un elemento <h3> para el título
    const createElementTitle = document.createElement ('h3');
    createElementTitle.innerHTML= result.title;
   //se crean dos elementos <p> para la infomación del argumento
    const createElementText= document.createElement('p');
    createElementText .setAttribute ('class', 'description__result');
    const elementTextHidden = document.createElement('p');
    elementTextHidden .setAttribute ('class', 'hidden');
    //se crea un elemento <span> para la fecha
    const createElementSpan= document.createElement('span');
    createElementSpan.setAttribute('class', 'result__date');
    //se crea un elemento <div> que contiene a todos los elementos de texto
    const elementTextContainer= document.createElement('div');
    elementTextContainer.setAttribute('class', 'result__container-text');
    //se crea un elemento <span> para desplegar la opción de leer más
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

//trasnformar fecha en formato mes, día y año
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
};

// longitud de párrafo
function textLengt(text, textDefault, hiddenText){
    if(text.length > 100){
        const textVisible= text.substr(0, 140) + '...';
        textDefault.innerHTML= textVisible;
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
};
//función nueva búsqueda
function removeSearch() {
    if(elementUlResults.innerHTML !== ''){
        elementUlResults.innerHTML = '';
    }
};
//función para que funcione la búsqueda pulsando la tecla enter
function enterKeySearchHandler (event){
    event.preventDefault();
    conectSearchHandler();
};

elementInput.addEventListener ('change',removeSearch);
elementForm.addEventListener ('submit', enterKeySearchHandler );
elementButtonSearch.addEventListener('click', conectSearchHandler);