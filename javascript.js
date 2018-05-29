const cardImages = [
  './lib/card-1.jpg',
  './lib/card-1.jpg',
  './lib/card-2.jpg',
  './lib/card-2.jpg',
  './lib/card-3.jpg',
  './lib/card-3.jpg',
  './lib/card-4.jpg',
  './lib/card-4.jpg',
  './lib/card-5.jpg',
  './lib/card-5.jpg',
  './lib/card-6.jpg',
  './lib/card-6.jpg',
  './lib/card-7.jpg',
  './lib/card-7.jpg',
  './lib/card-8.jpg',
  './lib/card-8.jpg',
  './lib/card-9.jpg',
  './lib/card-9.jpg',
  './lib/card-10.jpg',
  './lib/card-10.jpg',
  './lib/card-11.jpg',
  './lib/card-11.jpg',
  './lib/card-12.jpg',
  './lib/card-12.jpg'
];
const cardBackImagePath = './lib/card-back.jpg';
const ids = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25
];

let firstClick = true;
let firstGuess, secondGuess;
let numberOfMatches = 0;
let gameObject;

function randomizeArray(arr) {
  return arr.sort(function() {
    return 0.5 - Math.random();
  });
}

function incrementGuessCount() {
  let oldGuessNumber = document.getElementById('counter').innerText;
  document.getElementById('counter').innerText = +oldGuessNumber + 1;
}

function toggleFlippedClasses(element) {
  if (element.classList.contains('unflipped')) {
    element.classList.remove('unflipped');
    element.classList.add('flipped');
  } else {
    element.classList.remove('flipped');
    element.classList.add('unflipped');
  }
}

function cardClickHandler() {
  if (firstClick) {
    firstGuess = gameObject[event.currentTarget.id];
    if (firstGuess.status === 'unflipped') {
      toggleFlippedClasses(event.currentTarget.children[0]);
      firstGuess.status = 'flipped';
      firstClick = false;
      incrementGuessCount();
    } else if (
      firstGuess.status === 'flipped' ||
      firstGuess.status === 'matched'
    ) {
      firstGuess = null;
      alert('Invalid guess, try again!');
    }
  } else {
    //check if valid click, unflipped and not firstGuess
    secondGuess = gameObject[event.currentTarget.id];
    //check if valid click
    if (secondGuess.status === 'unflipped' && firstGuess !== secondGuess) {
      toggleFlippedClasses(event.currentTarget.children[0]);
      secondGuess.status = 'flipped';
      firstClick = false;
      incrementGuessCount();
    } else if (
      secondGuess.status === 'flipped' ||
      secondGuess.status === 'matched' ||
      firstGuess === secondGuess
    ) {
      secondGuess = null;
      alert('Invalid guess, try again!');
    }
    //check if match
    if (firstGuess.match_id === secondGuess.id) {
      gameObject[firstGuess.id].status = 'matched';
      gameObject[secondGuess.id].status = 'matched';
      removeCardListener(firstGuess.id);
      removeCardListener(secondGuess.id);

      //first click back to true
      firstClick = true;
      firstGuess = null;
      secondGuess = null;
      numberOfMatches += 1;
    } else {
      let firstID = firstGuess.id;
      let secondID = secondGuess.id;
      setTimeout(function() {
        toggleFlippedClasses(document.getElementById(firstID).children[0]);
        toggleFlippedClasses(document.getElementById(secondID).children[0]);
        document.getElementById(secondID).children[0].classList.add('matched');
        document.getElementById(secondID).children[0].classList.add('matched');
      }, 800);

      gameObject[firstGuess.id].status = 'unflipped';
      gameObject[secondGuess.id].status = 'unflipped';

      firstClick = true;
      firstGuess = null;
      secondGuess = null;
    }
  }
  if (numberOfMatches === 12) {
    removeAllCardListeners();
    appendWinDiv();
  }
}

function appendWinDiv() {
  let winDiv = document.createElement('div');
  winDiv.setAttribute('id', 'win-div');

  let winHeader = document.createElement('h1');
  winHeader.innerText = 'YOU WIN!';

  let playAgainBtn = document.createElement('btn');
  playAgainBtn.setAttribute('id', 'play-again-btn');
  playAgainBtn.innerText = 'PLAY AGAIN?';

  winDiv.appendChild(winHeader);
  winDiv.appendChild(playAgainBtn);

  let container = document.querySelector('body');
  container.appendChild(winDiv);

  addNewBtnListener('play-again-btn');
}

function removeCardListener(divID) {
  let targetDiv = document.getElementById(divID);
  console.log(targetDiv);
  targetDiv.removeEventListener('click', cardClickHandler);
}

function removeAllCardListeners() {
  let cardDivs = document.querySelectorAll('.board-space');
  for (let i = 0; i < cardDivs.length; i++) {
    cardDivs[i].removeEventListener('click', cardClickHandler);
  }
}

function constructGameObject() {
  let randomizedIds = randomizeArray(ids);
  gameObject = {};
  gameObject[randomizedIds[0]] = {
    type: 'counter'
  };
  for (let i = 1; i <= randomizedIds.length; i++) {
    gameObject[randomizedIds[i]] = {
      id: randomizedIds[i],
      type: 'card',
      card_front: cardImages[i - 1],
      card_back: '',
      status: 'unflipped'
    };
    if (i % 2 === 0) {
      gameObject[randomizedIds[i]].match_id = randomizedIds[i - 1];
    } else {
      gameObject[randomizedIds[i]].match_id = randomizedIds[i + 1];
    }
  }
  console.log(gameObject);
}

function buildCardSpace(number) {
  let cardDiv = document.createElement('div');
  cardDiv.classList.add('card-div');
  cardDiv.classList.add('unflipped');

  //add card front div
  let cardFrontDiv = document.createElement('div');
  cardFrontDiv.classList.add('card-face');
  cardFrontDiv.classList.add('card-front');
  let cardFrontImage = document.createElement('img');
  cardFrontImage.setAttribute('src', gameObject[number].card_front);
  cardFrontDiv.appendChild(cardFrontImage);

  //add card back div on top of card front div
  let cardBackDiv = document.createElement('div');
  cardBackDiv.classList.add('card-face');
  cardBackDiv.classList.add('card-back');
  let cardBackImage = document.createElement('img');
  cardBackImage.setAttribute('src', cardBackImagePath);
  cardBackDiv.appendChild(cardBackImage);

  cardDiv.appendChild(cardBackDiv);
  cardDiv.appendChild(cardFrontDiv);

  return cardDiv;
}

function buildCounterSpace() {
  let counterDiv = document.createElement('div');
  counterDiv.classList.add('counter-div');

  let counterHeader = document.createElement('h2');
  counterHeader.setAttribute('id', 'counter');
  counterHeader.innerHTML = 0;
  counterDiv.appendChild(counterHeader);

  return counterDiv;
}

function setupGameGrid() {
  let container = document.getElementById('content');

  for (let i = 1; i <= 25; i++) {
    let newSpace = document.createElement('div');
    newSpace.classList.add('board-space');
    newSpace.setAttribute('id', i);

    if (gameObject[i].type === 'card') {
      let cardDiv = buildCardSpace(i);

      newSpace.appendChild(cardDiv);
      newSpace.addEventListener('click', cardClickHandler);
    } else {
      let counterDiv = buildCounterSpace();

      newSpace.appendChild(counterDiv);
    }

    container.appendChild(newSpace);
  }
}

function clearChildNodes(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function startNewGame() {
  constructGameObject();
  numberOfMatches = 0;

  let winDiv = document.getElementById('win-div');
  if (winDiv) document.querySelector('body').removeChild(winDiv);
  clearChildNodes(document.getElementById('content'));

  setupGameGrid();
}

function addNewBtnListener(btnID) {
  document.getElementById(btnID).addEventListener('click', startNewGame);
}

document.addEventListener('DOMContentLoaded', function() {
  addNewBtnListener('new-btn');
});
