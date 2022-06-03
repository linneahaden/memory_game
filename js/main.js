"use strict";

const cardValues = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg',];
// Denna array borde vara ett objekt med key/value som nummer/img-url?


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
  // STÄDA UPP HÄR OCH GÖR TYDLIGARE KOMMENTARER
  const cardcontainerEl = document.getElementById('cardcontainer');
  cardcontainerEl.innerHTML = "";
  for (var i = 0; i < currentGameValues.length; i++) {
    console.log(currentGameValues[i]);
    let divEl = document.createElement("div");
    let imgEl = document.createElement("img");
    imgEl.src = currentGameValues[i];
    imgEl.classList.add("cardhidden");
    divEl.classList.add("card");
    divEl.classList.add(currentGameValues[i]);
    //Assigna arrayens index som id på varje element? Varför?
    cardcontainerEl.appendChild(divEl);
    divEl.appendChild(imgEl);
    divEl.addEventListener('click', checkCard);
  }
}

function checkCard() {
  console.log('checkCard');
}

// Blandar kortens värden med the Fisher–Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
