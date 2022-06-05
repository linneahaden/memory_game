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

// window.onload = function() {
//     newGame();
// };

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
    divEl.classList.add(currentGameValues[i]);
    divEl.classList.add("card");
    //divEl.setAttribute('id', currentGameValues[i]);
    //Assigna arrayens index som id på varje element? Varför?
    cardcontainerEl.appendChild(divEl);
    divEl.appendChild(imgEl);
    divEl.addEventListener('click', function(e){
      // console.log(this.firstElementChild);
      // console.log(this.className);
      // console.log(e.currentTarget === this);
      checkCard(this.classList, imgEl); //Skickar med objektet classList och child image
    }, false);
  }
}

// Vänder fram korten per klick och kollar om match.
function checkCard(classList, cardImage) {
  // console.log(classList[0]);
  if (cardTurn==0) {
    firstCard = classList[0];
    console.log('First card turned. ' + firstCard);
    //Vänd kortet, visa bilden.
    cardImage.classList.remove('cardhidden');
    //Gör kortet icke klickbart/vändbart. Hur? Ta bort event listener?
    cardTurn++; //Gör countern redo för klick på nästa kort.
  } else {
    secondCard = classList[0]
    console.log('Second card turned. ' + secondCard);
    //Vänd kortet, visa bilden.
    cardImage.classList.remove('cardhidden');
    //Jämför värdena på första och andra kortet.
    if (firstCard == secondCard) {
      console.log('Match!');

      //Lås elementen för vidare klick.

    } else {
      console.log('No match!');

      //Vänd tillbaka korten och gör första kortet klickbart igen.
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
