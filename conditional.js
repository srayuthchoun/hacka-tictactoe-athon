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
    for (var x = 0; x < lengthOfSide; x++) {
        for (var y = x; y < cells.length; y += lengthOfSide) {
            if (cells[y + lengthOfSide] == undefined) {
                console.log("Winner!");
                return;
            }
            else if (cells[y] != cells[y + lengthOfSide]) {
                y = cells.length;
            }
        }

        //for loop that checks every row for match
        for (var y = 0; y < cells.length; y += lengthOfSide) {
            //left to right diagonal check
            if (y == 0) {
                for (var leftToRight = 0; leftToRight < cells.length; leftToRight += (lengthOfSide + 1)) {
                    if (cells[leftToRight + lengthOfSide] == undefined) {
                        console.log("Winner!");
                        return;
                    }
                    else if (cells[leftToRight] != cells[leftToRight + (lengthOfSide + 1)]) {
                        leftToRight = cells.length;
                    }
                }
            }
            //right to left diagonal check
            else if (y == (cells.length - lengthOfSide)) {
                for (var rightToLeft = (lengthOfSide - 1); rightToLeft < cells.length; rightToLeft += (lengthOfSide - 1)) {
                    if (cells[rightToLeft + lengthOfSide] == undefined) {
                        console.log("Winner!");
                        return;
                    }
                    else if (cells[rightToLeft] != cells[rightToLeft + (lengthOfSide - 1)]) {
                        rightToLeft = cells.length;
                    }
                }
            }
            for (var x = y; x < (y + lengthOfSide); ++x) {
                if (cells[x + 1] == undefined) {
                    console.log("Winner!");
                    return;
                }
                else if (cells[x] != cells[x + 1]) {
                    x = cells.length;
                }
            }

        }
    }
}