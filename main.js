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
var possibleMove3;
var possibleMove4;
var counter = 0;
var winner = false;

var checkChildDiv1;
var checkChildDiv2;
var checkChildDiv3;
var checkChildDiv4;

var playerOnePoints = 0;
var playerTwoPoints = 0;

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
                $(storePosition).addClass('playerOne piece');
            }
            else if (array[i][j] === 2) {
                $(storePosition).addClass('playerTwo piece');
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
                possibleMoveColumnRight2 = column + 2;

            }

            possibleMove1 = $(`div[rowPosition = ${possibleMoveRow}][columnPosition = ${possibleMoveColumnLeft}]`);
            possibleMove2 = $(`div[rowPosition = ${possibleMoveRow}][columnPosition = ${possibleMoveColumnRight}]`);
            possibleMove3 = $(`div[rowPosition = ${possibleMoveRow2}][columnPosition = ${possibleMoveColumnLeft2}]`);
            possibleMove4 = $(`div[rowPosition = ${possibleMoveRow2}][columnPosition = ${possibleMoveColumnRight2}]`);

            //finding child divs of possible moves
            checkChildDiv1 = possibleMove1.find('div');
            checkChildDiv2 = possibleMove2.find('div');
            checkChildDiv3 = possibleMove3.find('div');
            checkChildDiv4 = possibleMove4.find('div');
            //checking if there are pieces on the possible move locations

            if (!checkChildDiv1.hasClass('playerOne') && (!checkChildDiv1.hasClass('playerTwo'))) {
                possibleMove1.addClass('highLight');
            }
            if (!checkChildDiv2.hasClass('playerOne') && (!checkChildDiv2.hasClass('playerTwo'))) {
                possibleMove2.addClass('highLight');
            }

            if (checkChildDiv1.hasClass('playerOne') || (checkChildDiv1.hasClass('playerTwo'))) {
                if (!checkChildDiv3.hasClass('playerOne') && (!checkChildDiv3.hasClass('playerTwo')))
                    possibleMove3.addClass('highLight');
                possibleMove3.addClass('jumpLeft');

            }

            if (checkChildDiv2.hasClass('playerOne') || (checkChildDiv2.hasClass('playerTwo'))) {
                if (!checkChildDiv4.hasClass('playerOne') && (!checkChildDiv4.hasClass('playerTwo')))
                    possibleMove4.addClass('highLight');
                possibleMove4.addClass('jumpRight');

            }

            gameBoardArray[row][column] = 0;

            counter = 1;

        }
    } else if (secondClickedPosition === null) {
        secondClickedPosition = $(this);
        movePiece();
    }
}

function movePiece() {

    var checkNewSquare = secondClickedPosition.find('div');
    if (secondClickedPosition.hasClass('highLight')) {

        var newColumn = secondClickedPosition.attr('columnPosition');
        var newRow = secondClickedPosition.attr('rowPosition');
        newColumn = parseInt(newColumn);
        newRow = parseInt(newRow);

        if (secondClickedPosition.hasClass('jumpLeft')) {
            console.log('you were jumped');
            console.log("checkChildDiv1", checkChildDiv1)
            checkChildDiv1.removeClass('playerOne');
            checkChildDiv1.removeClass('playerTwo');
            if (player === 0) {
                gameBoardArray[newRow - 1][newColumn - 1] = 0;
                playerOnePoints++
            } else if (player === 1) {
                gameBoardArray[newRow - 1][newColumn + 1] = 0;
                playerTwoPoints++
            }
        }

        if (secondClickedPosition.hasClass('jumpRight')) {
            console.log('you were jumped');
            console.log("checkChildDiv2", checkChildDiv2)
            checkChildDiv2.removeClass('playerOne');
            checkChildDiv2.removeClass('playerTwo');
            if (player === 0) {
                gameBoardArray[newRow - 1][newColumn - 1] = 0;
                playerOnePoints++
            } else if (player === 1) {
                gameBoardArray[newRow - 1][newColumn + 1] = 0;
                playerTwoPoints++
            }
        }



        if (check.hasClass('playerOne')) {
            gameBoardArray[newRow][newColumn] = 1;
        } else if (check.hasClass('playerTwo')) {
            gameBoardArray[newRow][newColumn] = 2;
        }

        check.removeClass('playerOne');
        check.removeClass('playerTwo');


        console.log(gameBoardArray);

        $(possibleMove1).removeClass('highLight');
        $(possibleMove2).removeClass('highLight');
        $(possibleMove3).removeClass('highLight');
        $(possibleMove4).removeClass('highLight');

        firstClickedPosition = null;
        secondClickedPosition = null;
        //buildGameBoard(gameBoardArray);
        addGamePieces(gameBoardArray);
        player = 1 - player;
        counter = 0;

    }
}

function remove() {
    // CODE FOR APPENDING PIECE TO STATS
    if (player === 0) { $('#player2').append("<div class='capturedPiece'></div>") };
    if (player === 1) { $('#player1').append("<div class='capturedPiece'></div>") };
    }
    if(player == 1) {$('#player2').append("<div class='capturedPiece'></div>")};
    if(player == 2) {$('#player1').append("<div class='capturedPiece'></div>")};


function checkForWinner(array){
    //while the winner variable is false runs the loop
    console.log('this function exists');
    var counterOne = 0;
    var counterTwo = 0;
    while (winner = false){
        console.log('while loop')
        for (var i = 0; i<array.length; i++){
            for (var j = 0; j<array.length; j++){
                if(array[i][j] === 1){
                    counterOne++;
                    console.log(counterOne);
                } else if(array[i][j] === 2){
                    counterTwo++;
                    console.log(counterTwo);
                }
            }
        }
        console.log('hello');
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




  function selected() {
    var selected;
    var playerTurn = ($(this).attr("class").split(' ')[0]);
    if(playerTurn) {
      if($(this).hasClass('selected')) {
          selected = true;
          $('.piece').each(function(index){
          $('.piece').eq(index).removeClass('selected')})};
      if(!selected) {
        $(this).addClass('selected');
    }
}
}

// BACKUP WIN FUNCTION
function win(){
    if (playerCount1 === all_pieces_captured) {
        // alert('You have won!');
        playerOneWins();  
    } if (playerCount2 === all_pieces_captured) {
        // alert('You have won!');
        playerTwoWins();
    }

}

function resetGame(){
        window.location.reload();
}










