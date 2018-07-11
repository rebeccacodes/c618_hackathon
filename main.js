var player = 1;

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
                $(squareOne).append("<div class='playerOne'></div>");
                console.log("array value at 1: ", array[i][j]);

            }
             else if (array[i][j] === 2) {
                var squareTwo = squares[i * 8 + j];
                $(squareTwo).append("<div class='playerTwo'></div>");
                console.log("array value at 2: ", array[i][j]);
            }
        }

    }
}

addGamePieces(gameBoardArray);

function showPlayerOneModal(){
    $('.shadow1').addClass('show');
}

function showPlayerTwoModal(){
    $('.shadow2').addClass('show');
}

function removePlayerOneModal(){
    $('.shadow1').removeClass('show');
}

function removePlayerTwoModal(){
    $('.shadow2').removeClass('show');
}

function changePlayer(){
    if (player = 1){
        player = 2;
        showPlayerOneModal();
        setTimeout(removePlayerOneModal(), 1000);
    }
    if (player =2){
        player = 1;
        showPlayerTwoModal();
        setTimeout(removePlayerTwoModal(), 1000);
    }
}