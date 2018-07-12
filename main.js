$(document).ready(startupGame);


//global variables below
var player = 1;
var firstClickedPosition = null;
var secondClickedPosition = null;

function startupGame() {
    buildGameBoard(gameBoardArray);
    addGamePieces(gameBoardArray);
    activateClickHandlers();
}

function activateClickHandlers() {
    $(".dark").click(movePiece);

    // var selected;
    // var playerTurn = ($(this).attr("class").split(' ')[0]);
    // if (playerTurn) {
    //     if ($(this).hasClass('selected')) {
    //         selected = true;
    //         $('.piece').each(function (index) {
    //             $('.piece').eq(index).removeClass('selected')
    //         })
    //     };
    //     if (!selected) {
    //         $(this).addClass('selected');
    //     }
    // }
}
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
                var nestedDiv = $('<div>').addClass('empty');
                gridSquare.append(nestedDiv);
                gridRow.append(gridSquare);
            } else if (alternate === 0) {
                var gridSquare1 = $("<div>", {
                    class: "dark square",
                    columnPosition: j,
                    rowPosition: i
                });
                var nestedDiv = $('<div>').addClass('empty');
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

function showPlayerOneModal() {
    $('.shadow1').addClass('show');
}

function removePlayerOneModal() {
    $('.shadow1').removeClass('show');
}

function changePlayer() {
    if (player = 1) {
        player = 2;
        showPlayerOneModal();
        setTimeout(removePlayerOneModal(), 1000);
    }
    if (player = 2) {
        player = 1;
        showPlayerTwoModal();
        setTimeout(removePlayerTwoModal(), 1000);
    }
}


//NEED TO ADD $(this).removeClass('selected') to MOVE FUNCTION after piece is moved; 


var removePiece = function () {
    // $(this).css("display", "none");
    gameBoardArray[this.attr("columnPosition")][this.attr("rowPosition")] = 0;

}

var check;
function movePiece() {
    //verify whose turn it is
    console.log('move piece function clicked');

    if (firstClickedPosition === null) {
        firstClickedPosition = $(this);

        check = firstClickedPosition.find('div');
        // check.removeClass('playerOne');
        if (check.hasClass('playerOne')) {
            // check.removeClass('playerOne');
            //get the rowPosition and columnPosition of the piece to move

            var column = firstClickedPosition.attr('columnPosition');
            var row = firstClickedPosition.attr('rowPosition');
            console.log('column row', column, row);
            column = parseInt(column);
            row = parseInt(row);
            gameBoardArray[row][column] = 0;

            firstClickedPosition = 1;
            console.log(gameBoardArray);
        }
    } else if (secondClickedPosition === null) {
        secondClickedPosition = $(this);
        var checkNewSquare = secondClickedPosition.find('div');
        if (checkNewSquare.hasClass('playerOne') || checkNewSquare.hasClass('playerTwo')) {
            console.log('a player is on this spot');
        } else {
            var newColumn = secondClickedPosition.attr('columnPosition');
            var newRow = secondClickedPosition.attr('rowPosition');
            newColumn = parseInt(newColumn);
            newRow = parseInt(newRow);

            gameBoardArray[newRow][newColumn] = 1;
            check.removeClass('playerOne');
            addGamePieces(gameBoardArray);

            firstClickedPosition = null;
            secondClickedPosition = null;
        }
    }
}











