$(document).ready(startupGame);

//global variables below

function startupGame() {
    buildGameBoard(gameBoardArray);
    addGamePieces(gameBoardArray);
    activateClickHandlers();
}

function activateClickHandlers() {
    $(".playerOne").click(movePiece);
    $(".playerTwo").click(movePiece);
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

        })
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
                })
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
            else if (array[i][j] === 2) {
            }
        }
    }
}

//NEED TO ADD $(this).removeClass('selected') to MOVE FUNCTION after piece is moved; 


var removePiece = function () {
    // $(this).css("display", "none");
    gameBoardArray[this.attr("columnPosition")][this.attr("rowPosition")] = 0;

}

function movePiece() {
    //verify whose turn it is
    console.log("move piece function");
    //identify square that was clicked
    var pieceToMove = $(this);
    console.log("piece to move", pieceToMove);
    var check = pieceToMove.find('div');
    console.log("what is this", pieceToMove);

    //and make sure it has a piece on it
    if (check.hasClass('playerOne')) {
        console.log('player one exists');
    }
    //get the rowPosition and columnPosition of the piece to move
    var column = pieceToMove.attr('columnPosition');
    var row = pieceToMove.attr('rowPosition');
    column = parseInt(column);
    row = parseInt(row);
    // coordinate the array position with the div that was selected
    // var arrayPositionValue = gameBoardArray[row][column];
    // console.log("arrayPositionValue: ", arrayPositionValue);

    //identify square that was clicked to move the piece to

    var placeToMoveTo = $(this);
    console.log("placeToMoveTo:", placeToMoveTo);
    var checkNewSquare = placeToMoveTo.find('div');
    var check = placeToMoveTo.find('div');

    if (check.hasClass('playerOne') || check.hasClass('playerTwo')) {
        console.log('a player is on this spot');
    } else {
        //get the rowPosition and columnPosition
        var newColumn = placeToMoveTo.attr('columnPosition');
        var newRow = placeToMoveTo.attr('rowPosition');
        newColumn = parseInt(newColumn);
        newRow = parseInt(newRow);
        //update the array so that the old square is now 0 and the new square now has the current player's number
        pieceToMove.removeClass('playerOne');
        //gameBoardArray[row][column] = 4;
        gameBoardArray[newRow][newColumn] = 1;
        console.log(gameBoardArray);

    }
    addGamePieces(gameBoardArray);
    //once array is updated, run add game pieces again
}

