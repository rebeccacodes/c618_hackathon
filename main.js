$(document).ready(startupGame);

//global variables below
var player = 0;
var firstClickedPosition = null;
var secondClickedPosition = null;
var check = null;
var secondCheck = null;
var column = null;
var row = null;

var newColumn = null;
var newRow = null;
var possibleMove1;
var possibleMove2;
var possibleMove3;
var possibleMove4;
var winner = false;

var checkChildDiv1;
var checkChildDiv2;
var checkChildDiv3;
var checkChildDiv4;

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

//checks to see which player's turn it is and display's modal if player goes out of turn
function checkPlayerTurn() {
    if (player === 0) {
        if (check.hasClass('playerTwo')) {
            firstClickedPosition = null;
            check = null;
            showPlayerOneModal()
        }
    } else if (player === 1) {
        if (check.hasClass('playerOne')) {
            firstClickedPosition = null;
            check = null;
            showPlayerTwoModal();
        }
    }
}
/////////////functions to display various modals//////////////////
function showPlayerOneModal() {
    $('.shadow1').css('display', 'inline-block');
}
function showPlayerTwoModal() {
    $('.shadow2').css('display', 'inline-block');
}
function playerOneWins() {
    $('.shadowOneWinner').css('display', 'block');
}
function playerTwoWins() {
    $('.shadowTwoWinner').css('display', 'inline-block');
}
/////////////////////////////////////////////////////////////////

// click on shadow of modal to remove
window.onclick = function (event) {
    var modal = document.getElementById("p1modal");
    var modalTwo = document.getElementById("p2modal");

    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modalTwo) {
        modalTwo.style.display = "none";
    }

}
//loops thru game board two dimensional array to populate the board alternating the colors
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

// displays checkers on the board based on the numbers in the two dimensional array
function addGamePieces(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            var storePosition = `div[rowPosition=${i}][columnPosition=${j}]>div`;

            if (array[i][j] === 0) {

            } else if (array[i][j] === 1) {
                $(storePosition).addClass('playerOne piece');
            } else if (array[i][j] === 2) {
                $(storePosition).addClass('playerTwo piece');
            } else if (array[i][j] === 3) {
                $(storePosition).addClass('playerOneKing piece');
            } else if (array[i][j] === 4) {
                $(storePosition).addClass('playerTwoKing piece');
            }

        }
    }
}

function pieceClicked() {
    //check to see if a piece has been clicked
    if (firstClickedPosition === null) {
        //if not, assign current click to firstClickedPosition
        firstClickedPosition = $(this);
        //find child div
        check = firstClickedPosition.find('div');
        //make sure it is the correct player's turn
        checkPlayerTurn();
        //if the piece doesn't have class piece, it isn't valid so exit
        if (!check.hasClass('piece')) {
            firstClickedPosition = null;
            secondClickedPosition = null;
            return;
        }
        //if the chip is a valid checker piece
        if (check.hasClass('playerOne') || check.hasClass('playerTwo')) {
            //check what moves are available to checker piece
            possibleMoves();
        }
        //if the piece clicked is the second piece clicked
    } else if (secondClickedPosition === null) {
        //assign div clicked to a variable
        secondClickedPosition = $(this);
        //if the second piece clicked doesn't have a class of highlight it is not valid reset clicked variables
        if (!secondClickedPosition.hasClass('highLight')) {
            firstClickedPosition = null;
            secondClickedPosition = null;
            possibleMove1.removeClass('highLight');
            possibleMove2.removeClass('highLight');
            possibleMove3.removeClass('highLight').removeClass('jumpLeft');
            possibleMove4.removeClass('highLight').removeClass('jumpRight');
            return;
        } else {
            //if piece clicked is valid, move piece
            movePiece();
        }
    }
}

function possibleMoves() {
    //if the chip is a valid checker piece
    if (check.hasClass('playerOne') || check.hasClass('playerTwo')) {
        //record the row & column position of clicked chip
        column = firstClickedPosition.attr('columnPosition');
        row = firstClickedPosition.attr('rowPosition');
        column = parseInt(column);
        row = parseInt(row);

        //gameBoardArray[row][column] = 0;

        //possible column & row changes for player one
        if (check.hasClass('playerOne')) {
            var possibleMoveColumnLeft = column - 1;
            var possibleMoveColumnRight = column + 1;
            var possibleMoveRow = row + 1;

            var possibleMoveRow2 = row + 2;
            var possibleMoveColumnRight2 = column + 2;
            var possibleMoveColumnLeft2 = column - 2;
            //possible column & row changes for player two
        } else if (check.hasClass('playerTwo')) {
            possibleMoveRow = row - 1;
            possibleMoveColumnLeft = column - 1;
            possibleMoveColumnRight = column + 1;

            possibleMoveRow2 = row - 2;
            possibleMoveColumnLeft2 = column - 2;
            possibleMoveColumnRight2 = column + 2;

        }
        //possible move combinations for all players
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

        if (player === 0) {
            if (checkChildDiv1.hasClass('playerTwo')) {
                if (!checkChildDiv3.hasClass('playerOne') && (!checkChildDiv3.hasClass('playerTwo')))
                    possibleMove3.addClass('highLight');
                possibleMove3.addClass('jumpLeft');
            }
        }

        if (player === 1) {
            if (checkChildDiv1.hasClass('playerOne')) {
                if (!checkChildDiv3.hasClass('playerOne') && (!checkChildDiv3.hasClass('playerTwo')))
                    possibleMove3.addClass('highLight');
                possibleMove3.addClass('jumpLeft');
            }
        }

        if (player === 0) {
            if (checkChildDiv2.hasClass('playerTwo')) {
                if (!checkChildDiv4.hasClass('playerOne') && (!checkChildDiv4.hasClass('playerTwo')))
                    possibleMove4.addClass('highLight');
                possibleMove4.addClass('jumpRight');

            }
        }

        if (player === 1) {
            if (checkChildDiv2.hasClass('playerOne')) {
                if (!checkChildDiv4.hasClass('playerOne') && (!checkChildDiv4.hasClass('playerTwo')))
                    possibleMove4.addClass('highLight');
                possibleMove4.addClass('jumpRight');
            }
        }
    }

}

function movePiece() {
    //check for class of highlight to make sure it it is valid move
    if (secondClickedPosition.hasClass('highLight')) {
        //get row and column attributes of the move
        newColumn = secondClickedPosition.attr('columnPosition');
        newRow = secondClickedPosition.attr('rowPosition');
        newColumn = parseInt(newColumn);
        newRow = parseInt(newRow);

        secondCheck = secondClickedPosition.find('div');
        gameBoardArray[row][column] = 0;
        //check for king
        checkForKing();

        if (secondClickedPosition.hasClass('jumpLeft')) {
            //if second div clicked has class of jumpLeft, remove player classes od the div that this move jumps over
            checkChildDiv1.removeClass('playerOne');
            checkChildDiv1.removeClass('playerTwo');
            //depending on whose turn it is, will determine location of div to set to zero in the array
            //then we update the scoreboard by adding capturedPiece class and appending to scoreboard
            if (player === 0) {
                gameBoardArray[newRow - 1][newColumn + 1] = 0;
                $('#player2').append("<div class='capturedPiece'></div>");
            } else if (player === 1) {
                gameBoardArray[newRow + 1][newColumn + 1] = 0;
                $('#player1').append("<div class='capturedPiece'></div>");
            }
        }
        if (secondClickedPosition.hasClass('jumpRight')) {
            //if second div clicked has class of jumpeRight, remove player classes of the div that this move jumps over
            checkChildDiv2.removeClass('playerOne');
            checkChildDiv2.removeClass('playerTwo');
            //depending on whose turn it is, will determine location of div that was jumped & to set to zero in the array
            //then we update the scoreboard by adding capturedPiece class and appending to scoreboard
            if (player === 0) {
                gameBoardArray[newRow - 1][newColumn - 1] = 0;
                $('#player2').append("<div class='capturedPiece'></div>");
            } else if (player === 1) {
                gameBoardArray[newRow + 1][newColumn - 1] = 0;
                $('#player1').append("<div class='capturedPiece'></div>");

            }
        }
        //determines who is current player so the array is updated with the correct number

        if (check.hasClass('playerOneKing')) {
            check.removeClass('playerOne');
            gameBoardArray[newRow][newColumn] = 3;

        } else if (check.hasClass('playerOne')) {
            gameBoardArray[newRow][newColumn] = 1;

        } else if (check.hasClass('playerTwoKing')) {
            check.removeClass('playerTwo');
            gameBoardArray[newRow][newColumn] = 4;

        } else if (check.hasClass('playerTwo')) {
            gameBoardArray[newRow][newColumn] = 2;
        }

        //removes player class on firstPieceClicked so that the piece will no longer appear in the old spot when the gameboard is updated
        check.removeClass('playerOne');
        check.removeClass('playerTwo');
        //removes the classes of highlight and jumpLeft / jumpRight to reset
        $(possibleMove1).removeClass('highLight');
        $(possibleMove2).removeClass('highLight');
        $(possibleMove3).removeClass('highLight').removeClass('jumpLeft');
        $(possibleMove4).removeClass('highLight').removeClass('jumpRight');
        //resets clicks
        firstClickedPosition = null;
        secondClickedPosition = null;

        //checks for winning condiition
        checkForWinner(gameBoardArray);
        //updates game pieces on board
        addGamePieces(gameBoardArray);
        //changes player turns
        player = 1 - player;
        //runs function that shows whose turn it currently is
        changeP();

    }
}
//switches white bar back and forth to indicate player turn
function changeP() {
    if (player == 1) {
        $('.turn').css("background", "linear-gradient(to right, transparent 50%, white 50%)");
        return;
    }
    if (player == 0) {
        $('.turn').css("background", "linear-gradient(to right, white 50%, transparent 50%)");

    }
}

function checkForKing() {
    var kingRow = secondClickedPosition.attr('rowPosition');
    var kingCol = secondClickedPosition.attr('columnPosition');

    if (player === 0) {

        if (secondClickedPosition.attr('rowPosition') == 7) {
            gameBoardArray[kingRow][kingCol] = 3;
            $(secondCheck).removeClass('playerOne').addClass('playerOneKing');
            secondClickedPosition.removeClass('jumpLeft').removeClass('jumpRight');
            console.log(gameBoardArray);
        }
    }
    if (player === 1) {

        if (secondClickedPosition.attr('rowPosition') == 0) {
            gameBoardArray[kingRow][kingCol] = 4;
            $(secondCheck).removeClass('playerTwo').addClass('playerTwoKing');
            secondClickedPosition.removeClass('jumpLeft').removeClass('jumpRight');
            console.log(gameBoardArray);
        }
    }
    return;
}

function checkForWinner(array) {
    //while the winner variable is false runs the loop
    var counterOne = 0;
    var counterTwo = 0;
    while (winner == false) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array.length; j++) {
                if (array[i][j] === 1) {
                    counterOne++;
                }
                if (array[i][j] === 2) {
                    counterTwo++;
                }
            }
        }
        if (counterOne === 0) {
            winner = true;
            playerTwoWins();
        }
        if (counterTwo === 0) {
            winner = true;
            playerOneWins()
        } else {
            counterOne = 0;
            counterTwo = 0;
            break;
        }
    }
}

function resetGame() {
    window.location.reload();
}