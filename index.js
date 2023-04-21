// Variables
const fetchCharacterApi = "https://gateway.marvel.com/v1/public/characters";
const ts = 1;
const publicKey = "6bc6a9a01d71939ddb9b6d50a5782b61";
const hash = "0bd260bb5cda72489c2a0d59bad11992";

var superheroArrayList = [];

const superheroList = document.getElementById("superhero-list");
const searchKey = document.getElementById("search-key");

// this  function is an async function that fetches all superheroes data from the Marvel API 
// and adds the data to the superheroArrayList using await to wait for the response from the API.
async function fetchAllSuperhero(){
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);

}
// this  function takes a name parameter and fetches the superheroes whose name starts with the input name.
async function fetchSuperheroWithName(name){
    var resp = await fetch(`${fetchCharacterApi}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}`);

    var data = await resp.json();

    var results = data.data.results;

    superheroArrayList = results;

    addToList(results);
}

function addToList(results){
    superheroList.innerHTML = "";
    const li = document.createElement('li');
    results.map((item)=>{
        const li = document.createElement('li');
        li.innerHTML = `<div class="container">
                            
                            <img height="230" width="250" src=${item.thumbnail.path}.${item.thumbnail.extension} />
                            <a  href="info.html?id=${item.id}"> <button> <u> ${item.name} </u> </button> </a>
                        </div>` ;

        superheroList.append(li);
        

    })}

searchKey.addEventListener('keyup', ()=>{
    const searchKeyVal = searchKey.value.trim();
    
    if (searchKeyVal ==0){
        fetchAllSuperhero();
    }

    if(searchKeyVal.length < 2){
        return;
    }
    fetchSuperheroWithName(searchKeyVal);
})

// this function is called to initially populate the superheroArrayList with all superheroes data.
fetchAllSuperhero();