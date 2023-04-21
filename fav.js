
var list = document.getElementById('list');
const SUPERHERO_KEY = 'superhero';
 

function getItemFromLS(){
	var favSuperHeroArray = JSON.parse(localStorage.getItem(SUPERHERO_KEY));
	if(!favSuperHeroArray){
		favSuperHeroArray = [];
	}
	return favSuperHeroArray;
}

function removeItemFromLS(item){
	var favSuperHeroArray = getItemFromLS();
	favSuperHeroArray = favSuperHeroArray.filter((tempItem)=>{
		return item != tempItem;
	});
	localStorage.setItem(SUPERHERO_KEY,JSON.stringify(favSuperHeroArray));
}

async function getAllSuperhero(){
	var favouriteSuperHeroArray = getItemFromLS();
	favouriteSuperHeroArray.map(async (item)=>{
		let resp = await fetch(`https://gateway.marvel.com/v1/public/characters/${item}?ts=1&apikey=6bc6a9a01d71939ddb9b6d50a5782b61&hash=0bd260bb5cda72489c2a0d59bad11992`);
		let data = await resp.json();
		data = data.data.results[0];
		var li = document.createElement('li');
		console.log(data);
        li.innerHTML = `<div class="container">
							<p data-id=${data.id}>${data.name}</p>
							<img height="250" width="250" src=${data.thumbnail.path}.${data.thumbnail.extension}>
							<button class='removeFromFav'><u>Remove from Favourites</u></button>
						</div>`;
		list.append(li);
        li.getElementsByClassName('removeFromFav')[0].addEventListener('click',function (){
            removeItemFromLS(data.id);
			location.reload();
        });
	})
}

getAllSuperhero();