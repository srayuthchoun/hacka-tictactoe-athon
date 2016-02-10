/**
 * Created by Timmy on 2/10/2016.
 */
//declare array that holds cells
var cells = [];

//hard coded conditional function for winning
function winCondition() {
    if (cells[0] == cells[1] && cells[1] == cells[2]) {
        console.log("Someone won!");
    }
    else if (cells[0] == cells[3] && cells[3] == cells[6]) {
        console.log("Someone won!");
    }
    else if (cells[0] == cells[4] && cells[4] == cells[8]) {
        console.log("Someone won!");
    }
    else if (cells[1] == cells[4] && cells[4] == cells[7]) {
        console.log("Someone won!");
    }
    else if (cells[3] == cells[4] && cells[4] == cells[5]) {
        console.log("Someone won!");
    }
    else if (cells[2] == cells[5] && cells[5] == cells[8]) {
        console.log("Someone won!");
    }
    else if (cells[6] == cells[7] && cells[7] == cells[8]) {
        console.log("Someone won!");
    }
    else if (cells[2] == cells[4] && cells[4] == cells[6]) {
        console.log("Someone won!");
    }
}

//dynamic conditional function for winning
function winConditionDynamic() {
    //define variable that is equal to the length of cells in a side
    var lengthOfSide = Math.sqrt(cells.length);
    //for loop that checks every column for match
    for (var verticalCheck = 0; verticalCheck < lengthOfSide; verticalCheck++) {

    }
    //for loop that checks every row for match
    for (var horizontalCheck = 0; horizontalCheck < cells.length; horizontalCheck += (lengthOfSide - 1)) {
        //left to right diagonal check
        if (horizontalCheck == 0) {
            for (var leftToRight = 0; leftToRight < cells.length; i++) {

            }
        }
        //right to left diagonal check
        else if (horizontalCheck == (cells.length - lengthOfSide)) {

        }

    }
}