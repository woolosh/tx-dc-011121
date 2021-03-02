// this sets the URL equal to a variable (to make it easier to refer to later)
const BASE_URL = "http://localhost:3000/pokemon/";

// When a user clicks on the monsters button:
// Fetch all of the monster data
// Render a card for each monster

// When a user submits a name and img URL on the form
// Make a POST request to /pokemon
// Render the new pokemon on the DOM

// When a user clicks the like button on a card
// Make a PATCH request to /pokemon/:id
// Increment that pokemons likes on the DOM

// When a user clicks the "LET GO" Btn
// Make a DELETE request to /pokemon/:id
// Remove that pokemon from the DOM

// this is added because the script link in the html file is located within the header
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#pokeBtn").addEventListener("click", getPokemon);
  document.querySelector("form").addEventListener("submit", createPokemon);
});

// this is the initial fetch for data
const getPokemon = () => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((pokemonData) => pokemonData.forEach(renderPokemon));
};

// this is the rendering of the data fetched in lines 26-29
const renderPokemon = (pokemon) => {
  let pokeCard = document.createElement("div");
  pokeCard.classList.add("card", "m-2");

  let pokeImg = document.createElement("img");
  pokeImg.className = "card-img-top";
  pokeImg.src = pokemon.sprite;

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = pokemon.name;

  let likeBtn = document.createElement("button");
  likeBtn.innerText = `Likes: ${pokemon.likes}`;
  likeBtn.classList.add("btn", "btn-primary");
  likeBtn.id = pokemon.id;
  likeBtn.addEventListener("click", likePokemon);

  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.classList.add("btn", "btn-danger");
  delBtn.addEventListener("click", () => {
    delPokemon(pokemon, pokeCard);
  });
  //   let commentList = document.createElement("ul");
  //   commentList.classList.add("list-group", "list-group-flush");
  //   the comment list was initially started by AdamJ., but not finished. So I commented it out.

  //   once you have created the html elements you need; append them appropriately
  pokeCard.append(pokeImg, cardBody);
  cardBody.append(cardTitle, likeBtn, delBtn);
  document.querySelector("#pokemon-container").appendChild(pokeCard);
};

// create a new pokemon (clicking Submit button)
// make sure to add this event to the DOMContentLoaded addEventListener
function createPokemon(event) {
  event.preventDefault();
  let newPokemon = {
    name: event.target.pokeName.value,
    likes: 0,
    sprite: event.target.pokeImg.value,
  };
  let reqObj = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(newPokemon),
  };
  fetch(BASE_URL, reqObj)
    .then((response) => response.json())
    .then(renderPokemon);
  console.log(renderPokemon);
}

// like a pokemon
function likePokemon(event) {
  let newLikes = {
    likes: +event.target.innerText.split(" ")[1] + 1,
  };
  let reqObj = {
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
    body: JSON.stringify(newLikes),
  };
  fetch(BASE_URL + event.target.id, reqObj)
    .then((res) => res.json())
    .then((updatedPokemon) => {
      document.getElementById(
        updatedPokemon.id
      ).innerText = `Likes: ${updatedPokemon.likes}`;
    });
}

// delete a pokemon
function delPokemon(pokemon, pokeCard) {
  fetch(BASE_URL + pokemon.id, { method: "DELETE" }).then(() =>
    pokeCard.remove()
  );
}
