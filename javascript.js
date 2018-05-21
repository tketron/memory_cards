const cardImages = [];

function buildCardSpace() {

}

function randomizeArray(arr) {
    return arr.sort(function () { return 0.5 - Math.random() });
}

function constructGameObject() {
    //create object for each id with
    //random link to card front/back
    //

    let gameObject = {};
    for (let i = 1; i <= 25; i++) {
        gameObject[i] = {
            type: '' // card or 
        }
    }
}

function setupGameGrid() {
    let container = document.getElementById('content');

    const gameObject = constructGameObject();

    for (let i = 1; i <= 25; i++) {
        let newSpace = document.createElement('div');
        newSpace.classList.add('board-space');
        newSpace.setAttribute('id', i);
        let cardImage = document.createElement('img');
        cardImage.setAttribute('src', './lib/card-1.jpg');
        newSpace.appendChild(cardImage);
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