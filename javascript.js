const cardImages = ['./lib/card-1.jpg', './lib/card-1.jpg', './lib/card-2.jpg', './lib/card-2.jpg', './lib/card-3.jpg', './lib/card-3.jpg', './lib/card-4.jpg', './lib/card-4.jpg', './lib/card-5.jpg', './lib/card-5.jpg', './lib/card-6.jpg', './lib/card-6.jpg', './lib/card-7.jpg', './lib/card-7.jpg', './lib/card-8.jpg', './lib/card-8.jpg', './lib/card-9.jpg', './lib/card-9.jpg', './lib/card-10.jpg', './lib/card-10.jpg', './lib/card-11.jpg', './lib/card-11.jpg', './lib/card-12.jpg', './lib/card-12.jpg'];
const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

function buildCardSpace() {

}

function buildCounterSpace() {

}

function randomizeArray(arr) {
    return arr.sort(function () { return 0.5 - Math.random() });
}

function constructGameObject() {
    let randomizedIds = randomizeArray(ids);
    console.log(randomizedIds);
    let gameObject = {};
    gameObject[randomizedIds[0]] = {
        type: 'counter'
    }
    for (let i = 1; i <= randomizedIds.length; i++) {
        gameObject[randomizedIds[i]] = {
            type: 'card',
            card_front: cardImages[i - 1],
            card_back: '',
            status: 'unmatched',
        }
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
            let cardImage = document.createElement('img');
            cardImage.setAttribute('src', gameObject[i].card_front);
            newSpace.appendChild(cardImage);
        } else {
            let counterDiv = document.createElement('div');
            counterDiv.classList.add('counter-div');

            let counterHeader = document.createElement('h2');
            counterHeader.setAttribute('id', 'counter');
            counterHeader.innerHTML = 0;
            counterDiv.appendChild(counterHeader);

            newSpace.appendChild(counterDiv);
        }

        let id_text = document.createElement('p');
        id_text.innerHTML = i;

        newSpace.appendChild(id_text);
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
    document.getElementById('new-btn').addEventListener('click', function () {
        startNewGame();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    addBtnListener();
});