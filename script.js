//declaring global variables
const filmsBtn = document.querySelector('#explore-films');
const directorsBtn = document.querySelector('#explore-directors');
const charaBtn = document.querySelector('#explore-characters');
const searchBtn = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-contain');
const resultsDiv = document.querySelector('#results-div');
const resultsInfo = document.querySelector('#results-info');
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
    
    
    fetch('https://kikis-ghibli-app.herokuapp.com/films')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for director results
function directorHandler(){
    resultsInfo.innerText = ''
 

    fetch('https://kikis-ghibli-app.herokuapp.com/directors')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for character results
function charaHandler(){
    resultsInfo.innerText = ''


    fetch('https://kikis-ghibli-app.herokuapp.com/characters')
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

    }else if(searchBy === 'title'){
        titleFetch(searchInput);
       
    }else if(searchBy === 'director'){
        directorFetch(searchInput);

    }else if(searchBy === 'character'){
        characterFetch(searchInput);

    }
}

//fetches results by keywork search
function keywordFetch(input){
    fetch(`https://kikis-ghibli-app.herokuapp.com/films?q=${input}`)
    .then(res => res.json())
    .then(data => searchResults(data))
}

//fetches results by Title search
function titleFetch(input){
    fetch(`https://kikis-ghibli-app.herokuapp.com/films?title_like=${input}`)
    .then(res => res.json())
    .then(data => searchResults(data))
}

//fetches results by Character search
function characterFetch(input){
    fetch(`https://kikis-ghibli-app.herokuapp.com/characters?name_like=${input}`)
    .then(res => res.json())
    .then(data => searchResults(data))
}

//fetches results by Character search
function directorFetch(input){
    fetch(`https://kikis-ghibli-app.herokuapp.com/directors?name_like=${input}`)
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

// cleans results div and then runs addCard function
function cardCreator(data){
    resultsCardClearer();
    moreInfoClearer();

    for(let i=0; i<data.length; i++){
        addCard(data[i]);
    }
}

//creates elements for the results cards and appends them to the dom
function addCard(data){
    resultsDiv.style = 'display:'

    const resultsCardDiv = document.createElement('div');
    resultsCardDiv.id = data['url'].slice(22);
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
    console.log(id);
    
    moreInfoClearer();

    fetch(`https://kikis-ghibli-app.herokuapp.com/${id}`)
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
    moreInfoDiv.appendChild(backBtn);

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
    if(data['original_title']){
        infoSubHeader.innerText = data['original_title']
    }else if(data['gender']){
        infoSubHeader.innerText = data['films'][0]['title']
    }else{
        infoSubHeader.innerText = data['alt_name'];
    };
    moreTextDiv.appendChild(infoSubHeader);

    const infoH4 = document.createElement('h4');
    infoH4.className = 'more-info-sub';
    if(data['director']){
        infoH4.innerText = data['director']
    }else if(data['species']){
        infoH4.innerText = data['species'];
    }else{
        infoH4.innerText = `Director`;
    };
    moreTextDiv.appendChild(infoH4);

    const infoH42 = document.createElement('h4');
    infoH42.className = 'more-info-sub';
    
    if(data['release_date']){
        infoH42.innerText = data['release_date']
    }else if(data['eye_color']){
        infoH42.innerText = `Age: ${data['age']}`;
    }else{
        infoH42.innerText = data['dates'];
    };
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
    
    miniCardFetcher(data);
}

//fetches mini cards data
function miniCardFetcher(data){
    
    if(data['people']){

        for(let i=0;i<data['people'].length; i++){
            fetch(data['people'][i])
            .then(res=>res.json())
            .then(data=>miniCardCreator(data))
        }
    }else{

        for(let i=0;i<data['films'].length; i++){
            fetch(data['films'][i]['url'])
            .then(res=>res.json())
            .then(data=>miniCardCreator(data))
        }
    }
}

//creates mini cards for more info card
function miniCardCreator(data){
    
    const miniCardDiv = document.querySelector('#mini-grid')

    const miniCard = document.createElement('div');
    miniCard.id = data['url'].slice(22);
    miniCard.className = 'mini-cards';
    miniCardDiv.appendChild(miniCard);
    miniCard.addEventListener('click', moreInfoHandler);

    const miniImg = document.createElement('img');
    miniImg.src = data['image'];
    miniImg.className = 'mini-card-img';
    miniCard.appendChild(miniImg);

    const miniInfo = document.createElement('h5');
    miniInfo.innerText = data['name'] ? data['name'] : data['title'];
    miniCard.appendChild(miniInfo)
}

//back button handler
function backHandler(){
    moreInfoClearer();

    resultsDiv.style = 'display:';
}