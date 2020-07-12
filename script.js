var initBoard;
var huPlayer;
var aiPlayer;

var gameFinish = null;
const winningCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [6,4,2],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector('.endGame').style.display = "none";
    initBoard = Array.from(Array(9).keys());

    for(let i=0;i<cells.length;i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
    toss();
}

function toss() {
    let toss = Math.floor(Math.random() * 2) + 1;
    if(toss === 1){
         huPlayer ='X';
         aiPlayer = 'O';
         document.querySelector('.your-turn').innerText = "Your Turn : X";
    } else {
         huPlayer ='O';
         aiPlayer = 'X';
         document.querySelector('.your-turn').innerText = "Your Turn : O";
        turn(bestSpot(), aiPlayer)
    }
}

function turnClick(event) {

    if(typeof initBoard[event.target.id] == 'number'){
        turn(event.target.id, huPlayer);
        if(!gameFinish && !checkTie()) {
            turn(bestSpot(), aiPlayer);
        }
    } 
}

function turn(boardId, player) {
    initBoard[boardId] = player
    document.getElementById(boardId).innerText = player;

    gameFinish = checkWin(initBoard, player);
    if (gameFinish) {
        gameOver(gameFinish)
    }
}

function checkWin(board, player) {
    let plays = board.reduce((a,e,i) => 
        (e === player) ? a.concat(i) : a, []);
    
    let gameWon = null;

    for(let [index, winCombo] of winningCombo.entries()) {
        if(winCombo.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for(let index of winningCombo[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }
    for(let i=0;i<cells.length;i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player === huPlayer ? "You Win": "You Lose")
}

function checkTie() {
    if(emptySpots().length === 0){
        for(let i=0;i<cells.length;i++) {
            cells[i].style.backgroundColor = "grey";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}

function emptySpots() {
    return initBoard.filter(spot => typeof spot == 'number')
}

function bestSpot() {
    return miniMax(initBoard, aiPlayer).index;
}

function declareWinner(winner) {
    document.querySelector('.endGame').style.display = "block";
    document.querySelector('.endGame .result').innerText = winner;
}

function miniMax(board, player) {
    let availSpots = emptySpots(board);

    if(checkWin(board, player)) {
        return {score: -10};
    } else if (checkWin(board, aiPlayer)) {
        return { score: 10}
    } else if( availSpots.length === 0){
        return {score:0}
    }

    var moves = [];

    for (let i = 0; i < availSpots.length; i++) {
        let move ={};
        move.index = board[availSpots[i]];
        board[availSpots[i]] = player;

        if(player === aiPlayer){
            let result = miniMax(board, huPlayer);
            move.score = result.score;
        } else {
            let result = miniMax(board, aiPlayer);
            move.score = result.score;
        }
        board[availSpots[i]] = move.index;
        moves.push(move);
    }

    let bestMove;
    if(player === aiPlayer){
        let bestScore = -100000;
        for (let i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 100000;
        for (let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}