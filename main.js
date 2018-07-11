$(document).ready(initializeApp);

function initializeApp(){
$(".playerOne").click(activateClickHandlers);
$(".playerTwo").click(activateClickHandlers);
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
            class: "row",
        })
        for (var j = 0; j < array[i].length; j++) {
            if (alternate === 1) {
                var gridSquare = $("<div>", {
                    class: "light square"
                })
                gridRow.append(gridSquare);
            } else if (alternate === 0) {
                var gridSquare1 = $("<div>", {
                    class: "dark square"
                })
                gridRow.append(gridSquare1);
            }

            alternate = 1 - alternate;
        }
        alternate = 1 - alternate;
        gameBoard.append(gridRow);
    }
}
buildGameBoard(gameBoardArray);

function addGamePieces(array) {
    var squares = $('.square');
    
    for (var i = 0; i < array.length; i++) {

        for (var j = 0; j < array.length; j++) {
            if (array[i][j] === 0) {
                console.log("array value at 0: ", array[i][j]);

            } else if (array[i][j] === 1) {

                var squareOne = squares[i * 8 + j];
                $(squareOne).append("<div class='playerOne piece'></div>");
                console.log("array value at 1: ", array[i][j]);

            }
             else if (array[i][j] === 2) {
                var squareTwo = squares[i * 8 + j];
                $(squareTwo).append("<div class='playerTwo piece'></div>");
                console.log("array value at 2: ", array[i][j]);
            }
        }

    }
}

addGamePieces(gameBoardArray);

function activateClickHandlers() {
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

//NEED TO ADD $(this).removeClass('selected') to MOVE FUNCTION after piece is moved; 


var removePiece = function () {
    // $(this).css("display", "none");
    gameBoardArray[this.attr("columnPosition")][this.attr("rowPosition")] = 0;

  }
