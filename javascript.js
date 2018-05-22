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

function buildCardSpace() {}

function buildCounterSpace() {}

function randomizeArray(arr) {
  return arr.sort(function() {
    return 0.5 - Math.random();
  });
}

function incrementGuessCount() {
  let oldGuessNumber = document.getElementById('counter').innerText;
  document.getElementById('counter').innerText = +oldGuessNumber + 1;
}

function cardClickHandler(gameObject) {
  if (firstClick) {
    // console.log('first');
    // console.log(event.currentTarget);
    firstGuess = gameObject[event.currentTarget.id];
    //check if valid click
    if (firstGuess.status === 'unflipped') {
      //   console.log('unmatched');
      //   console.log(event.currentTarget.children[0]);
      //   event.currentTarget.children[0].classList.remove('unflipped');
      event.currentTarget.children[0].classList.add('flipped');
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

    //flip card

    //store id
  } else {
    //check if valid click, unflipped and not firstGuess
    secondGuess = gameObject[event.currentTarget.id];
    //check if valid click
    if (secondGuess.status === 'unflipped' && firstGuess !== secondGuess) {
      //   console.log('unmatched');
      //   console.log(event.currentTarget.children[0]);
      //   event.currentTarget.children[0].classList.remove('unflipped');
      event.currentTarget.children[0].classList.add('flipped');
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
    //check if match with id 1
    if (firstGuess.match_id === secondGuess.id) {
      //   alert(`IT'S A MATCH!!!`);
      //keep classes

      //edit gameObject entries
      gameObject[firstGuess.id].status = 'matched';
      gameObject[secondGuess.id].status = 'matched';

      //first guess back to true
      firstClick = true;
      firstGuess = null;
      secondGuess = null;
      numberOfMatches += 1;
    } else {
      //not a match
      console.log(document.getElementById(firstGuess.id).children[0]);
      document
        .getElementById(firstGuess.id)
        .children[0].classList.remove('flipped');
      document
        .getElementById(secondGuess.id)
        .children[0].classList.remove('flipped');
      //edit gameObject entries
      gameObject[firstGuess.id].status = 'unflipped';
      gameObject[secondGuess.id].status = 'unflipped';

      //first guess back to true
      firstClick = true;
      firstGuess = null;
      secondGuess = null;
    }
  }
  if (numberOfMatches === 12) {
    prompt('You Win!!');
  }
  console.log(firstGuess);
  console.log(secondGuess);
}

function constructGameObject() {
  let randomizedIds = randomizeArray(ids);
  //   console.log(randomizedIds);
  let gameObject = {};
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
  return gameObject;
}

function setupGameGrid() {
  let container = document.getElementById('content');

  const gameObject = constructGameObject();

  for (let i = 1; i <= 25; i++) {
    let newSpace = document.createElement('div');
    newSpace.classList.add('board-space');
    newSpace.setAttribute('id', i);

    if (gameObject[i].type === 'card') {
      newSpace.addEventListener('click', function() {
        cardClickHandler(gameObject);
      });
      let cardDiv = document.createElement('div');
      cardDiv.classList.add('card-div');
      cardDiv.classList.add('unflipped');
      let cardImage = document.createElement('img');
      cardImage.setAttribute('src', gameObject[i].card_front);

      cardDiv.appendChild(cardImage);
      newSpace.appendChild(cardDiv);
    } else {
      let counterDiv = document.createElement('div');
      counterDiv.classList.add('counter-div');

      let counterHeader = document.createElement('h2');
      counterHeader.setAttribute('id', 'counter');
      counterHeader.innerHTML = 0;
      counterDiv.appendChild(counterHeader);

      newSpace.appendChild(counterDiv);
    }

    // let id_text = document.createElement('p');
    // id_text.innerHTML = i;
    // newSpace.appendChild(id_text);

    container.appendChild(newSpace);
  }
}

function clearChildNodes(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function startNewGame() {
  clearChildNodes(document.getElementById('content'));
  setupGameGrid();
}

function addBtnListener() {
  document.getElementById('new-btn').addEventListener('click', function() {
    startNewGame();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  addBtnListener();
});
