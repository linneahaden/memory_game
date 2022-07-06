"use strict";

const cardValues = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg'];
//
// Denna array borde vara ett objekt med key/value som nummer/img-url?
let cardTurn = 0; //För antalet uppvända kort. (Behöver vara en counter och inte true/false för att kunna lägga till möjligheten att vändra fler kort.)
let firstCard;
let secondCard;
let matched = 0;

// ::::::::::::::::::::ELEMENT-VARIABLER::::::::::::::::::::
const newgamebuttonEl = document.getElementById('newgamebutton');
const endscreenEl = document.getElementById('endscreen');

// ::::::::::::::::::::EVENT LISTENERS::::::::::::::::::::
newgamebuttonEl.addEventListener('click', newGame, false);

// ::::::::::::::::::::FUNKTIONER::::::::::::::::::::

window.onload = function() {
    newGame();
};

// Startar ny spelomgång
function newGame() {
  cardTurn = 0;
  matched = 0;

  let newGameValues = cardValues;
  let currentGameValues = [];
  // Kombinerar till ny array för att matcha 2 kort.
  // För att tillåta fler matchninar, t.ex. 3 kort, behöver bl.a. detta block justeras.
  for (let i = 2; i > 0; i--) {
    currentGameValues.push(...newGameValues);
  }
  // Blandar den nya arrayen.
  shuffle(currentGameValues);
  //console.log('Current game values: ' + currentGameValues);

  // HTML elements and classes
  endscreenEl.classList.add('hide');
  // Outer card/game container
  const cardcontainerEl = document.getElementById('cardcontainer');
  cardcontainerEl.innerHTML = "";

  for (let i = 0; i < currentGameValues.length; i++) {

    let currentCard = currentGameValues[i];
    //console.log(currentCard);

    // Single card container
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
    backImgEl.src = "img/back.jpg";

    // Child order and event listener
    cardcontainerEl.appendChild(cardEl);
    cardEl.appendChild(frontImgEl);
    cardEl.appendChild(backImgEl);
    cardEventListener(cardEl); //Adds event listener to the single card container
  }
}

// Adds event listener
function cardEventListener(cardEl) {
  cardEl.addEventListener('click', () => {
    checkCard(cardEl);
    //console.log('I run only once! 😇');
  }, { once: true }); //Runs only once
}

// Vänder fram korten och kollar om match.
// Dela upp denna funktion i flera?
function checkCard(cardEl) {

  cardEl.classList.add("flip"); //Vänder kortet
  //console.log(cardEl);
  if (cardTurn==0) {
    firstCard = cardEl;
    //console.log('First card turned. ' + firstCard.dataset.value);
    cardTurn++; //Gör countern redo för klick på nästa kort.

  } else {
    secondCard = cardEl;
    //console.log('Second card turned. ' + secondCard.dataset.value);

    //Jämför värdena på första och andra kortet.
    if (firstCard.dataset.value == secondCard.dataset.value) {
      console.log('Match!');
      matched++;
      var match = new Audio('audio/match.mp3');
      setTimeout(() =>match.play(), 400);
      checkIfFinished();

    } else {
      console.log('No match!');

      //Vänder tillbaka korten
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
      }, 1200);

      // Lägger tillbaka event listener på båda korten.
      cardEventListener(firstCard);
      cardEventListener(secondCard);
    }
    cardTurn = 0; //Återställer countern i aktuellt spel.
  }
}

function checkIfFinished() {
  if (matched == cardValues.length) {
    endscreenEl.classList.remove('hide');
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
