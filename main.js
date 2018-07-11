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

function movePiece() {
    //verify whose turn it is
    console.log('click function works');

    var pieceToMove = $(this);

    //identify square that was clicked and make sure it has a piece on it
    //get the rowPosition and columnPosition
    var column = pieceToMove.attr('columnPosition');
    var row = pieceToMove.attr('rowPosition');
    column = parseInt(column);
    row = parseInt(row);

    var arrayPositionValue = gameBoardArray[row][column];
    console.log("arrayPositionValue: ", arrayPositionValue);


    var check = pieceToMove.find('div');

    if (check.hasClass('playerOne')) {
        console.log('player one exists');
    }
    //identify square that was clicked to move the piece to
    var placeToMoveTo = $(this);
    var checkNewSquare = pieceToMove.find('div');

    if (check.hasClass('playerOne') || check.hasClass('playerTwo')) {
        console.log('a player is on this spot');
    }

    //get the rowPosition and columnPosition

    //update the array so that the old square is now 0 and the new square now has the current player's number


    //once array is updated, run add game pieces again
}
