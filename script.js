//declaring global variables
const filmsBtn = document.querySelector('#explore-films');
const directorsBtn = document.querySelector('#explore-directors');
const charaBtn = document.querySelector('#explore-characters');
const searchBtn = document.querySelector('#search-form');

//event listeners for explore buttons
filmsBtn.addEventListener('click', filmsHandler);
directorsBtn.addEventListener('click', directorHandler);
charaBtn.addEventListener('click', charaHandler);

//event listener for submit button on search
searchBtn.addEventListener('submit', searchHandler);

//fetch for film results
function filmsHandler(){
    fetch('https://ghibliapi.herokuapp.com/films')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for director results
function directorHandler(){
    fetch('https://ghibliapi.herokuapp.com/films')
    .then(r=>r.json())
    .then(data=>directorExtractor(data));
}

//extracting director results from fetch
//probably need to create director objects
function directorExtractor(data){
    console.log(data)
    const results = [];
    for(let i=0; i<data.length; i++){
        if(!(results.includes(data[i]['director']))){
            results.push(data[i]['director']);
        }//else{
            //add film title to film key
        //} 
    }
    console.log(results);

}

//fetch for character results
function charaHandler(){
    fetch('https://ghibliapi.herokuapp.com/people')
    .then(r=>r.json())
    .then(data=>cardCreator(data));
}

//fetch for search bar
function searchHandler(e){
    e.preventDefault();
    const searchInput = document.querySelector('#keyword-input').value
    const searchBy = document.querySelector('#search-select').value
    
    if(searchBy === 'keyword'){
        console.log('keyword search')
    }else if(searchBy === 'director'){
        console.log('director search')
    }else if(searchBy === 'title'){
        console.log('title search')
    }else if(searchBy === 'character'){
        console.log('character search')
    }
}

//card creator function
function cardCreator(data){
    console.log(data)
}