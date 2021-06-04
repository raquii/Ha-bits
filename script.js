//declaring global variables
const filmsBtn = document.querySelector('#explore-films');
const directorsBtn = document.querySelector('#explore-directors');
const charaBtn = document.querySelector('#explore-characters');
const searchBtn = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-contain');
const resultsDiv = document.querySelector('#results-div');
const resultsInfo = document.querySelector('#results-info');
const endPointTracker = document.querySelector('#endpoint-tracker');
const moreInfoCont = document.querySelector('#moreContain');

//event listeners for explore buttons
filmsBtn.addEventListener('click', filmsHandler);
directorsBtn.addEventListener('click', directorHandler);
charaBtn.addEventListener('click', charaHandler);

//event listener for submit button on search
searchBtn.addEventListener('submit', searchHandler);

//fetch for film results
function filmsHandler(){
    resultsInfo.innerText = '';
    endPointTracker.innerHTML = 'films/';
    
    fetch('http://localhost:3000/films')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for director results
function directorHandler(){
    resultsInfo.innerText = ''
    endPointTracker.innerHTML = 'directors/';

    fetch('http://localhost:3000/directors')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for character results
function charaHandler(){
    resultsInfo.innerText = ''
    endPointTracker.innerHTML = 'characters/';

    fetch('http://localhost:3000/characters')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//search bar handler
function searchHandler(e){
    e.preventDefault();
    const searchBy = document.querySelector('#search-select').value;
    const searchInput = document.querySelector('#keyword-input').value;
    if(searchBy === 'keyword'){
        keywordFetch(searchInput);
        endPointTracker.innerHTML = 'films/';
    }else if(searchBy === 'title'){
        titleFetch(searchInput);
        endPointTracker.innerHTML = 'films/';
    }else if(searchBy === 'director'){
        directorFetch(searchInput);
        endPointTracker.innerHTML = 'directors/';
    }else if(searchBy === 'character'){
        characterFetch(searchInput);
        endPointTracker.innerHTML = 'characters/';
    }
}

//fetches results by keywork search
function keywordFetch(input){
    fetch(`http://localhost:3000/films?q=${input}`)
    .then(res => res.json())
    .then(data => searchResults(data))
}

//fetches results by Title search
function titleFetch(input){
    fetch(`http://localhost:3000/films?title_like=${input}`)
    .then(res => res.json())
    .then(data => searchResults(data))
}

//fetches results by Character search
function characterFetch(input){
    fetch(`http://localhost:3000/characters?name_like=${input}`)
    .then(res => res.json())
    .then(data => searchResults(data))
}

//fetches results by Character search
function directorFetch(input){
    fetch(`http://localhost:3000/directors?name_like=${input}`)
    .then(res => res.json())
    .then(data => searchResults(data))
}

//search result display function
function searchResults(data){
    const navDiv = document.querySelector('#nav-div');
    const resultsQuantity = data.length;
    const searchInput = document.querySelector('#keyword-input');

    if(data.length > 0){
        resultsInfo.innerText = `Displaying ${resultsQuantity} results for '${searchInput.value}':`;
        cardCreator(data);
    }else{
        resultsInfo.innerText = `Oh no! Soot Sprites must have carried away all of the results for '${searchInput.value}'. Try again!`
    }
    navDiv.appendChild(resultsInfo);
    searchInput.value = '';  
}

// cleans results div and then runs addCard function
function cardCreator(data){
    resultsCardClearer();
    moreInfoClearer();

    for(let i=0; i<data.length; i++){
        addCard(data[i]);
    }
}

//empties resultsDiv
function resultsCardClearer(){
    while (resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.lastChild);
    }
}

//empties moreInfoDiv and removes
function moreInfoClearer(){
    while (moreInfoCont.firstChild){
        moreInfoCont.removeChild(moreInfoCont.lastChild);
    }
}

//creates elements for the results cards and appends them to the dom
function addCard(data){
    resultsDiv.style = 'display:'

    const resultsCardDiv = document.createElement('div');
    resultsCardDiv.id = data['id'];
    resultsCardDiv.className = 'results-card';
    resultsDiv.appendChild(resultsCardDiv);
    
    const resultsImg = document.createElement('img');
    resultsImg.src = data['image'];
    resultsImg.className = 'card-image';
    resultsCardDiv.appendChild(resultsImg);
    resultsCardDiv.addEventListener('click', moreInfoHandler);

    const popupDiv = document.createElement('div');
    popupDiv.className = 'results-pop-up';
    resultsCardDiv.appendChild(popupDiv);
    

    const resultsHeader = document.createElement('h3');
    resultsHeader.className = 'card-title';
    resultsHeader.innerText = data['title'] ? data['title'] : data['name'] ;
    popupDiv.appendChild(resultsHeader);

    const descriptDiv = document.createElement('div');
    descriptDiv.className = 'results-description';
    popupDiv.appendChild(descriptDiv);

    const description = document.createElement('p');
    description.className = 'card-p';
    description.innerText = data['description'];
    descriptDiv.appendChild(description)
}

//handles hidding current results and fetching data when user clicks on cards
function moreInfoHandler(e){
    const id = e.currentTarget.id

    fetch(`http://localhost:3000/${endPointTracker.innerText}${id}`)
    .then(res=>res.json())
    .then(data=>addMoreInfo(data))
}

//creates more-info cards and appends them to the DOM
function addMoreInfo(data){
    resultsDiv.style = 'display:none';

    const moreInfoDiv = document.createElement('div');
    moreInfoDiv.id = data['id'];
    moreInfoDiv.className = 'more-info-card';
    moreInfoCont.appendChild(moreInfoDiv);

    const backBtn = document.createElement('button');
    backBtn.className = 'backBtn';
    backBtn.type = 'button';
    backBtn.value = 'back';
    backBtn.innerText = `<`;
    backBtn.addEventListener('click', backHandler);

    const moreInfoImg = document.createElement('img');
    moreInfoImg.src = data['image'];
    moreInfoImg.className = 'more-info-image';
    moreInfoDiv.appendChild(moreInfoImg);

    const moreTextDiv = document.createElement('div');
    moreTextDiv.id = 'more-info-text';
    moreInfoDiv.appendChild(moreTextDiv)

    const infoHeader = document.createElement('h2');
    infoHeader.id = 'more-info-header';
    infoHeader.innerText = data['title'] ? data['title'] : data['name'];
    moreTextDiv.appendChild(infoHeader);

    const infoSubHeader = document.createElement('h3');
    infoSubHeader.className = 'more-info-sub';
    infoSubHeader.innerText = data['original_title'] ? data['original_title'] : 'THIS IS SUPPOSED TO BE FILM TITLES';
    moreTextDiv.appendChild(infoSubHeader);

    const infoH4 = document.createElement('h4');
    infoH4.className = 'more-info-sub';
    infoH4.innerText = data['director'] ? data['director'] : data['species'];
    moreTextDiv.appendChild(infoH4);

    const infoH42 = document.createElement('h4');
    infoH42.className = 'more-info-sub';
    infoH42.innerText = data['release_date'] ? data['release_date'] : `Eye Color: ${data['eye_color']} Hair Color: ${data['hair_color']}`;
    moreTextDiv.appendChild(infoH42);

    const infoP = document.createElement('p');
    infoP.id = 'more-info-description';
    infoP.innerText = data['description'];
    moreTextDiv.appendChild(infoP);

    const miniCardDiv = document.createElement('div');
    miniCardDiv.id = 'mini-grid';
    moreTextDiv.appendChild(miniCardDiv);

    const miniHeader = document.createElement('h4');
    miniHeader.className = 'mini-header';
    miniHeader.innerText = data['people'] ? `CHARACTERS:` : `FILMS:`;
    miniCardDiv.appendChild(miniHeader);

}

//back button handler
function backHandler(e){
    moreInfoClearer();
    resultsDiv.style = 'display:';
}