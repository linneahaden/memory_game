"use strict";

const cardValues = [1, 2, 3, 4];


// ::::::::::::::::::::ELEMENT-VARIABLER::::::::::::::::::::
const newgamebuttonEl = document.getElementById('newgamebutton');

// ::::::::::::::::::::EVENT LISTENERS::::::::::::::::::::
newgamebuttonEl.addEventListener('click', newGame, false);

// ::::::::::::::::::::FUNKTIONER::::::::::::::::::::

// window.onload = function() {
//     newGame();
// };

// Startar ny spelomgång
function newGame() {
  var newGameValues = cardValues;
  let currentGameValues = [];

  // Blandar kortens värden två gånger och kombinerar till ny array
  for (let i = 2; i > 0; i--) {
    shuffle(newGameValues);
    currentGameValues.push(...newGameValues);
  }
  console.log('Current game values: ' + currentGameValues);

  // Lägger till html-element med kortens värden
  const cardcontainerEl = document.getElementById('cardcontainer');
  cardcontainerEl.innerHTML = "";
  for (var i = 0; i < currentGameValues.length; i++) {
    console.log(currentGameValues[i]);
    let divEl = document.createElement("div");
    divEl.classList.add("card");
    divEl.classList.add(currentGameValues[i]);
    divEl.innerHTML = currentGameValues[i];
    cardcontainerEl.appendChild(divEl);
  }
}

// Blandar kortens värden med the Fisher–Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//Att göra
// Tänker att...
// ...html-elementen assignas värdena i den nya arrayen
// ...när man klickar på två kort stannar de framme om de är lika, annars vänds de tillbaka

//Senare:
// -Val för antal kort
// -Val för svårighetsgrad, t.ex. räknar ner antal fel till game over eller man ska hitta tre i stället för två lika.
