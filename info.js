//variables
const ts = 1;
const publicKey = "6bc6a9a01d71939ddb9b6d50a5782b61";
const hash = "0bd260bb5cda72489c2a0d59bad11992";

const mainContainer = document.getElementById("main-container");

const fetchCharacterApi = "https://gateway.marvel.com/v1/public/characters";

const SUPERHERO_KEY = 'superhero';

document.addEventListener('DOMContentLoaded',function(){
    var resp=getParams(window.location.href);
    superheroWithId(resp.id);
});

function getParams(url) {
	var queryParameter=url.split("?")[1];
    queryParameter=queryParameter.split("&");
    var resp={};
    for(var i = 0; i < queryParameter.length; i++) {
        var temp=queryParameter[i].split("=");
        resp[temp[0]]=temp[1];
    }
    return resp;
};

function getItemFromLS(){
	var favSuperHeroArray = JSON.parse(localStorage.getItem(SUPERHERO_KEY));
	if(!favSuperHeroArray){
		favSuperHeroArray = [];
	}
	return favSuperHeroArray;
}


function addItemToLS(item){
    console.log(item);
	var favSuperHeroArray = getItemFromLS();
	//validation if item is present or not
	var isPresent = false;
	favSuperHeroArray.map((tempItem)=>{
		if(item == tempItem ){
			isPresent = true;
		}
	});
	if(isPresent){
		return;
	}
	favSuperHeroArray = [item,...favSuperHeroArray];
	localStorage.setItem(SUPERHERO_KEY,JSON.stringify(favSuperHeroArray));
}


async function superheroWithId(id){
    var resp = await fetch(fetchCharacterApi+"/"+id+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash);
    var data = await resp.json();
    var results = data.data.results;
    addToList(results);
}

async function superheroWithIdItem(id){
    var resp = await fetch(fetchCharacterApi+"/"+id+'?ts='+ts+'&apikey='+publicKey+'&hash='+hash);
    var data = await resp.json();
    var results = data.data.results;
    return results;
}

function addToList(results){
    if(!results || results.length<1){
        return;
    }
    const item=results[0];
    console.log(item);
    mainContainer.innerHTML=`<div >
                            <p><h4>${item.name}</h4></p>
                            <img height="350" width="350" src=${item.thumbnail.path}.${item.thumbnail.extension}></div>`;
    
    mainContainer.innerHTML+=`<h2>No. of Comics : ${item.comics.available}</h2>
                               <h2>No. of Series : ${item.series.available}</h2>
                               <h2>No. of Events : ${item.events.available}</h2>
                               <h2>No. of Stories : ${item.stories.available}</h2>`;

                            
    
}


(function() {
    const heart = document.getElementById('heart');
    heart.addEventListener('click', function(event) {
    heart.classList.toggle('red');
	const target = event.target;
    let arr = [];
    //If the clicked Element is the Heart Icon
    if (target.classList.contains("fav-btn")) {
        var resp=getParams(window.location.href);
        addItemToLS(resp.id);  
    }
});
})();

