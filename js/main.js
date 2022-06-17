"use strict";

const cardValues = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg',];
// Denna array borde vara ett objekt med key/value som nummer/img-url?
var cardTurn = 0; //För antalet uppvända kort.
var firstCard;
var secondCard;

// ::::::::::::::::::::ELEMENT-VARIABLER::::::::::::::::::::
const newgamebuttonEl = document.getElementById('newgamebutton');

// ::::::::::::::::::::EVENT LISTENERS::::::::::::::::::::
newgamebuttonEl.addEventListener('click', newGame, false);

// ::::::::::::::::::::FUNKTIONER::::::::::::::::::::

window.onload = function() {
    newGame();
};

// Startar ny spelomgång
function newGame() {
  cardTurn = 0;
  var newGameValues = cardValues;
  let currentGameValues = [];
  // Kombinerar till ny array för att matcha 2 kort.
  // För att tillåta fler matchninar, t.ex. 3 kort, behöver bl.a. denna funktion justeras.
  for (let i = 2; i > 0; i--) {
    currentGameValues.push(...newGameValues);
  }
  // Blandar den nya arrayen.
  shuffle(currentGameValues);
  //console.log('Current game values: ' + currentGameValues);

  // Lägger till html-element med kortens värden
  // STÄDA UPP HÄR OCH GÖR TYDLIGARE KOMMENTARER

  // Outer card container
  const cardcontainerEl = document.getElementById('cardcontainer');
  cardcontainerEl.innerHTML = "";



  for (var i = 0; i < currentGameValues.length; i++) {

    let currentCard = currentGameValues[i];
    console.log(currentCard);


    // HTML elements and classes

    // Card container
    let cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.setAttribute("data-value", currentCard);
    // Card front
    let frontImgEl = document.createElement("img");
    frontImgEl.classList.add("flipcardfront");
    frontImgEl.src = currentCard;
    // Card back
    let backImgEl = document.createElement("img");
    backImgEl.classList.add("flipcardback");
    backImgEl.src = "img/back.jpg"; // FIXA DETTA

    // Child order and event listeners
    cardcontainerEl.appendChild(cardEl);
    cardEl.appendChild(frontImgEl);
    cardEl.appendChild(backImgEl);
    cardEl.addEventListener('click', function(){
      // this.classList.add("flip");
      checkCard(cardEl); //Skickar med aktuellt kortvärde och card-elementet
    }, false);
  }
}

// Vänder fram korten och kollar om match.
function checkCard(cardEl) {
  //Vänder kortet
  cardEl.classList.add("flip");

  if (cardTurn==0) {
    firstCard = cardEl;
    console.log('First card turned. ' + firstCard);

    //Gör kortet icke klickbart/vändbart. Ta bort event listener!

    cardTurn++; //Gör countern redo för klick på nästa kort.
  } else {
    secondCard = cardEl;
    console.log('Second card turned. ' + secondCard);

    //Jämför värdena på första och andra kortet.
    if (firstCard.dataset.value == secondCard.dataset.value) {
      console.log('Match!');

      //Ta bort event listener på båda korten. (Redundant att göra det här?)

    } else {
      console.log('No match!');

      //Vänder tillbaka korten
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
      }, 1200);

      // Lägg tillbaka event listener på båda korten.

    }
    cardTurn--; //Återställer countern i aktuellt spel.
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
