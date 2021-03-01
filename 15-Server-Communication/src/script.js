// // Distinguish between synchronous and asynchronous code
// // Use fetch() to retrieve data from a server and display the results in the DOM
// // Understand promises
// // Be able to use the then() method to add handlers for promise resolution

// fetch("http://localhost:3000/pokemon")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (parsedRes) {
//     console.log(parsedRes);
//   });

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pokeBtn").addEventListener("click", getMahMonsters);
});

const getMahMonsters = () => {
  fetch("http://localhost:3000/pokemon")
    .then((response) => response.json())
    .then((pokemonData) =>
      pokemonData.forEach((pokemon) => {
        renderPokemon(pokemon);
      })
    );
};

function renderPokemon(pokemon) {
  let pokemonContainer = document.getElementById("pokemon-container");
  let pCard = document.createElement("div");
  pCard.classList.add("card", "m-2");
  let pImage = document.createElement("img");
  pImage.className = "card-img-top";
  pImage.src = pokemon.sprite;
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = pokemon.name;
  let commentList = document.createElement("ul");
  commentList.classList.add("list-group", "list-group-flush");
  pokemon.comments.forEach((comment) => {
    let newComment = document.createElement("li");
    newComment.innerText = comment;
    newComment.classList.add("list-group-item");
    commentList.appendChild(newComment);
  });

  // let pokemonName = document.createElement("h5");
  // pokemonName.innerText = pokemon.name;

  cardBody.append(cardTitle, commentList);
  pCard.append(pImage, cardBody);
  pokemonContainer.appendChild(pCard);
}

//// Reference for HTML Card
// // `<div class="card m-2">
// //       <img class="card-img-top" src=${pokemon.sprite} alt="Card image cap">
// //       <div class="card-body">
// //            <h5 class="card-title">${pokemon.name}</h5>
// //                 <ul class="list-group list-group-flush">
// //                     <li class="list-group-item">Cras justo odio</li>
// //                      <li class="list-group-item">Dapibus ac facilisis in</li>
// //                       <li class="list-group-item">Vestibulum at eros</li>
// //                         </ul>
// //                     </div>
// //                     <div class="card-footer">
// //                         <small class="text-muted">${pokemon.type}</small>
// //                     </div>
// //                 </div>`
