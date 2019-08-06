let restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', restartGame);

let currentGamerElem = document.querySelector('#current-gamer');

let cells = getFieldCells('#field td');
let currentGamer = 'X';
prepareField();

// перебираем ячейки и навешиваем событие
function prepareField() {
    activateCells(cells);
    showCurrentGamer(currentGamer, currentGamerElem);
}

// шаги игры - allow globals
function nextStep() {
    let cell = this;

    fillCell(cell, currentGamer);
    currentGamer = getNextGamer(currentGamer);

    showCurrentGamer(currentGamer, currentGamerElem);

    deactivateCell(cell);

    let winner = checkWinner(cells);
        if (winner !== false) {
            endGame(cells, winner, currentGamerElem);
        } else {
            let isFilled = checkFieldEnd(cells);
             if (isFilled) {
                endGame(cells, winner, currentGamerElem); 
            }
        }
}

// конец игры
function endGame (cells, winner, currentGamerElem) {
    stopClick(cells);
    showWinner(winner);
    showCurrentGamer('-', currentGamerElem);
}

// allow globals
function restartGame() {
    prepareField();
}

// вводим следующего игрока
function getNextGamer(currentGamer) {
    if (currentGamer === 'X') {
        return '0';
    } else {
        return'X';
    }
}

// заполнить ячейку
function fillCell(cell, content) {
    cell.innerHTML = content;
}


// нельзя кликать несколько раз по одной и той же ячейке
function deactivateCell(cell) {
    cell.removeEventListener('click', nextStep);
}

function activateCells(cell) {
    for (let i = 0; i < cells.length; i++ ) {
        cells[i].innerHTML = '';
        cells[i].addEventListener('click', nextStep);
    }
}

// добываем все ячейки
function getFieldCells(selector) {
    return document.querySelectorAll(selector);
}

// отвязываем события клика, если конец игры
function stopClick(cells) {
    for (let i = 0; i < cells.length; i++ ) {
        cells[i].removeEventListener('click', nextStep);
    }
}

// показать победителя 
function showWinner(winner) {
    if(winner !== false) {
        alert(winner);
    } else {
        alert('draw game');
    }
}

function showCurrentGamer(name, elem) {
    elem.innerHTML = name;
}

// находим выишрашную комбинацию
function checkWinner(cells) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        let oneCombination = winningCombinations[i];

        if (cells[oneCombination[0]].innerHTML === cells[oneCombination[1]].innerHTML &&
            cells[oneCombination[1]].innerHTML === cells[oneCombination[2]].innerHTML &&
            cells[oneCombination[0]].innerHTML !== '') {
                return cells[oneCombination[0]].innerHTML;
        }
    }
    return false;
}

function checkFieldEnd(cells) {
    for (let i = 0; i < cells.length; i++ ) {
        if (cells[i].innerHTML === '') {
            return false;
        }
    }
    return true;
}


// ячейка в таблице доступна через this 
// this.removeEventListener('click', tableDataClick); - убрали возможность 2 раза нажимать на 1 ячейку