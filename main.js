$(document).ready(startupGame);

//global variables below
var player = 0;
var firstClickedPosition = null;
var secondClickedPosition = null;
var check = null;
var column = null;
var row = null;
var possibleMove1;
var possibleMove2;
var counter = 0;
var winner = false;

var gameBoardArray = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0]
];

function startupGame() {
    buildGameBoard(gameBoardArray);
    addGamePieces(gameBoardArray);
    activateClickHandlers();

}

function activateClickHandlers() {
    $(".dark").click(pieceClicked);
}

function checkPlayerTurn() {
    if (player === 0) {
        if (check.hasClass('playerTwo')) {
            firstClickedPosition = null;
            check = null;
            showPlayerOneModal()
        } else {
            console.log("check passed");
        }
    } else if (player === 1) {
        if (check.hasClass('playerOne')) {
            firstClickedPosition = null;
            check = null;
            showPlayerTwoModal();

        } else {
            console.log("check passed");
        }
    }
}

function showPlayerOneModal() {
    $('.shadow1').css('display', 'inline-block');
}

/*function removePlayerOneModal() {
    $('.shadow1').css('display', 'none');
}*/

function showPlayerTwoModal() {
    $('.shadow2').css('display', 'inline-block');
}

/*
function removePlayerTwoModal() {
    $('.shadow2').css('display', 'none');
}
*/

function playerOneWins() {
    //temp
    $('.shadowOneWinner').css('display', 'inline-block');
}
function playerTwoWins(){
    //temp
    $('.shadowTwoWinner').css('display', 'inline-block');
}

function buildGameBoard(array) {
    var gameBoard = $('#game-board');
    var alternate = 1
    for (var i = 0; i < array.length; i++) {
        var gridRow = $("<div>", {
            class: "row"

        });
        for (var j = 0; j < array[i].length; j++) {
            if (alternate === 1) {
                var gridSquare = $("<div>", {
                    class: "light square",
                    columnPosition: j
                })
                var nestedDiv = $('<div>');
                gridSquare.append(nestedDiv);
                gridRow.append(gridSquare);
            } else if (alternate === 0) {
                var gridSquare1 = $("<div>", {
                    class: "dark square",
                    columnPosition: j,
                    rowPosition: i
                });
                var nestedDiv = $('<div>');
                gridSquare1.append(nestedDiv);
                gridRow.append(gridSquare1);
            }
            alternate = 1 - alternate;
        }
        alternate = 1 - alternate;
        gameBoard.append(gridRow);
    }
}

function addGamePieces(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            var storePosition = `div[rowPosition=${i}][columnPosition=${j}]>div`;

            if (array[i][j] === 0) {

            } else if (array[i][j] === 1) {
                $(storePosition).addClass('playerOne');
            }
            else if (array[i][j] === 2) {
                $(storePosition).addClass('playerTwo');
            }

        }
    }
}

function pieceClicked() {
    console.log("this right after piece clicked before assigned to variable", this);
    if (firstClickedPosition === null) {

        firstClickedPosition = $(this);
        console.log("firstClickedPosition ", firstClickedPosition);
        check = firstClickedPosition.find('div');

        checkPlayerTurn();

        if (check.hasClass('playerOne') || check.hasClass('playerTwo')) {

            var column = firstClickedPosition.attr('columnPosition');
            var row = firstClickedPosition.attr('rowPosition');
            console.log('column row', column, row);
            column = parseInt(column);
            row = parseInt(row);

            if (check.hasClass('playerOne')) {

                var possibleMoveColumnLeft = column - 1;
                var possibleMoveColumnRight = column + 1;
                var possibleMoveRow = row + 1;

                var possibleMoveRow2 = row + 2;
                var possibleMoveColumnRight2 = column + 2;
                var possibleMoveColumnLeft2 = column - 2;

            } else if (check.hasClass('playerTwo')) {

                possibleMoveRow = row - 1;
                possibleMoveColumnLeft = column - 1;
                possibleMoveColumnRight = column + 1;

                possibleMoveRow2 = row - 2;
                possibleMoveColumnLeft2 = column - 2;
                possibleMoveColumnRight2 = column - 2;

            }

            possibleMove1 = $(`div[rowPosition = ${possibleMoveRow}][columnPosition = ${possibleMoveColumnLeft}]`).addClass("highLight");
            possibleMove2 = $(`div[rowPosition = ${possibleMoveRow}][columnPosition = ${possibleMoveColumnRight}]`).addClass("highLight");

            gameBoardArray[row][column] = 0;

            counter = 1;

        }
    } else if (secondClickedPosition === null) {
        secondClickedPosition = $(this);
        console.log("secondClickedPosition ", secondClickedPosition)
        movePiece();
    }
}

function movePiece() {

    var checkNewSquare = secondClickedPosition.find('div');
    if (checkNewSquare.hasClass('playerOne') || checkNewSquare.hasClass('playerTwo')) {
        console.log('a player is on this spot');
    } else if (secondClickedPosition.hasClass('highLight')) {

        var newColumn = secondClickedPosition.attr('columnPosition');
        var newRow = secondClickedPosition.attr('rowPosition');
        newColumn = parseInt(newColumn);
        newRow = parseInt(newRow);

        if (check.hasClass('playerOne')) {
            gameBoardArray[newRow][newColumn] = 1;
        } else if (check.hasClass('playerTwo')) {
            gameBoardArray[newRow][newColumn] = 2;
        }

        check.removeClass('playerOne');
        check.removeClass('playerTwo');

        addGamePieces(gameBoardArray);

        $(possibleMove1).removeClass('highLight');
        $(possibleMove2).removeClass('highLight');

        firstClickedPosition = null;
        secondClickedPosition = null;

        player = 1 - player;
        counter = 0;
    }
}

this.remove = function () {
    // CODE FOR APPENDING PIECE TO STATS
    if(player == 1) {$('#player2').append("<div class='capturedPiece'></div>")};
    if(player == 2) {$('#player1').append("<div class='capturedPiece'></div>")};
}

function checkForWinner(){
    //while the winner variable is false runs the loop
    var counterOne = 0;
    var counterTwo = 0;
    while (winner = false){
        for (var i = 0; i<gameBoardArray.length; i++){
            for (var j = 0; j<gameBoardArray.length; j++){
                if(gameBoardArray[i][j] === 1){
                    counterOne++;
                    console.log(counterOne);
                } else if(gameBoardArray[i][j] === 2){
                    counterTwo++;
                    console.log(counterTwo);
                }
            }
        }
        if( counterOne === 0){
            playerTwoWins();
            winner = true;
        }
        if( counterTwo === 0 ){
            playerOneWins()
            winner = true;
        } else{
            counterOne = 0;
            counterTwo = 0;
            console.log('breaking out of loop');
            break;
        }
    }
}











