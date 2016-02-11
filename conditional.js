/**
 * Created by Timmy on 2/10/2016.
 */
//declare array that holds cells
var cells = [];
//define boolean that acts as a flag for when game can be played or not
var gameOver = false;

//hard coded conditional function for winning
function winCondition() {
    if (cells[1] != null && cells[0] == cells[1] && cells[1] == cells[2]) {
        console.log("Someone won!");
        gameOver = true;
    }
    else if (cells[3] != null && cells[0] == cells[3] && cells[3] == cells[6]) {
        console.log("Someone won!");
        gameOver = true;
    }
    else if (cells[4] != null && cells[0] == cells[4] && cells[4] == cells[8]) {
        console.log("Someone won!");
        gameOver = true;
    }
    else if (cells[4] != null && cells[1] == cells[4] && cells[4] == cells[7]) {
        console.log("Someone won!");
        gameOver = true;
    }
    else if (cells[4] != null && cells[3] == cells[4] && cells[4] == cells[5]) {
        console.log("Someone won!");
        gameOver = true;
    }
    else if (cells[5] != null && cells[2] == cells[5] && cells[5] == cells[8]) {
        console.log("Someone won!");
        gameOver = true;
    }
    else if (cells[7] != null && cells[6] == cells[7] && cells[7] == cells[8]) {
        console.log("Someone won!");
        gameOver = true;
    }
    else if (cells[4] != null && cells[2] == cells[4] && cells[4] == cells[6]) {
        console.log("Someone won!");
        gameOver = true;
    }
}

//dynamic conditional function for winning
function winConditionV2() {
    //define variable that is equal to the length of cells in a side
    var lengthOfSide = Math.sqrt(cells.length);
    console.log("lengthOfSide:", lengthOfSide);
    //for loop that checks every column for match
    for (var x = 0; x < lengthOfSide; x++) {
        for (var y = x; y < cells.length; y += lengthOfSide) {
            if (cells[y] != null && cells[y + lengthOfSide] === undefined) {
                console.log("Column Win!");
                gameOver = true;
                return;
            }
            else if (cells[y] != cells[y + lengthOfSide]) {
                y = cells.length;
            }
            console.log("looped, x=", x, "y=", y);
        }
    }
    //for loop that checks every row for match
    for (var y = 0; y < cells.length; y += lengthOfSide) {
        //left to right diagonal check
        if (y == 0) {
            for (var leftToRight = 0; leftToRight < cells.length; leftToRight += (lengthOfSide + 1)) {
                if (cells[leftToRight] != null && cells[leftToRight + lengthOfSide] === undefined) {
                    console.log("Diagonal Win!");
                    gameOver = true;
                    return;
                }
                else if (cells[leftToRight] != cells[leftToRight + (lengthOfSide + 1)]) {
                    leftToRight = cells.length;
                }
                console.log("looped, y=", y, "l2r=", leftToRight);
            }
        }
        //right to left diagonal check
        else if (y == (cells.length - lengthOfSide)) {
            for (var rightToLeft = (lengthOfSide - 1); rightToLeft < cells.length; rightToLeft += (lengthOfSide - 1)) {
                if (cells[rightToLeft] != null && cells[rightToLeft + lengthOfSide] === undefined) {
                    console.log("Diagonal Win!");
                    gameOver = true;
                    return;
                }
                else if (cells[rightToLeft] != cells[rightToLeft + (lengthOfSide - 1)]) {
                    rightToLeft = cells.length;
                }
                console.log("looped, y=", y, "r2l=", rightToLeft);
            }
        }
        var numOfLoops = 0;
        for (var x = y; x < (y + lengthOfSide); ++x) {
            //if (cells[x] != null && cells[x + 1] === undefined) {
            if (cells[x] != null && numOfLoops == (lengthOfSide - 1)) {
                console.log("Row Win!");
                gameOver = true;
                return;
            }
            else if (cells[x] != cells[x + 1]) {
                x = cells.length;
            }
            ++numOfLoops;
            console.log("looped, y=", y, "x=", x);
        }
    }
}