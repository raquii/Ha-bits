//declaring global variables
const filmsBtn = document.querySelector('#explore-films');
const directorsBtn = document.querySelector('#explore-directors');
const charaBtn = document.querySelector('#explore-characters');
const searchBtn = document.querySelector('#search-form');
const resultsDiv = document.querySelector('#results-div');

//event listeners for explore buttons
filmsBtn.addEventListener('click', filmsHandler);
directorsBtn.addEventListener('click', directorHandler);
charaBtn.addEventListener('click', charaHandler);

//event listener for submit button on search
searchBtn.addEventListener('submit', searchHandler);

//fetch for film results
function filmsHandler(){
    fetch('http://localhost:3000/films')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for director results
function directorHandler(){
    fetch('http://localhost:3000/directors')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for character results
function charaHandler(){
    fetch('http://localhost:3000/characters')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for search bar
function searchHandler(e){
    e.preventDefault();
    const searchInput = document.querySelector('#keyword-input').value;
    const searchBy = document.querySelector('#search-select').value;
    
    if(searchBy === 'keyword'){
        console.log('keyword search');
    }else if(searchBy === 'director'){
        console.log('director search');
    }else if(searchBy === 'title'){
        console.log('title search');
    }else if(searchBy === 'character'){
        console.log('character search');
    }
}

// first removes any children of resultsDiv then loops each element in the data into the addCard function
function cardCreator(data){
    while (resultsDiv.firstChild){
        resultsDiv.removeChild(resultsDiv.lastChild)
    }

    for(let i=0; i<data.length; i++){
        addCard(data[i])
    }
}

//creates elements for the results cards and appends them to the dom
function addCard(data){
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

function moreInfoHandler(e){
    console.log(e.currentTarget.id)
}