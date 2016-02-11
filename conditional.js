/**
 * Created by Timmy on 2/10/2016.
 */
//define boolean that acts as a flag for when game can be played or not
var gameOver = false;

var lengthOfSide;

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
    //this is done by finding the square root of the length of array
    lengthOfSide = Math.sqrt(cells.length)
    //column checker
    //for loop that acts as start point for every column
    for (var column = 0; column < lengthOfSide; column++) {
        //for loop that goes through current column
        for (var row = column; row < cells.length; row += lengthOfSide) {
            //if you reach the end of the column, then all elements are matching
            //if current index of array is not null and the next incremented index is undefined
            if (cells[row] != null && cells[row + lengthOfSide] === undefined) {
                console.log("Column", (column + 1), "wins!");
                //set bool gameOver to true
                gameOver = true;
                //call function win modal here
                if(current_player == player_1) {
                    gameOverModal('player1');
                }
                else {
                    gameOverModal('player2');
                }
                //exit function
                return;
            }
            //else if current index of array is not the same as next increment of array
            else if (cells[row] != cells[row + lengthOfSide]) {
                //exit immediate loop by breaking the loop condition
                row = cells.length;
            }
        }
        //left to right diagonal check
        //if var column is at position of top left cell
        if (column == 0) {
            //for loop that goes from top left cell diagonally to bottom right cell
            for (var leftToRight = 0; leftToRight < cells.length; leftToRight += (lengthOfSide + 1)) {
                //if you reach the end of the diagonal, then all elements are matching
                //if current index of array is not null and the next incremented index is undefined
                if (cells[leftToRight] != null && cells[leftToRight + lengthOfSide] === undefined) {
                    console.log("Left to right diagonal wins!");
                    //set bool gameOver to true
                    //call function win modal here
                    game_over()
                    //exit function
                    return;
                }
                //else if current index of array is not the same as next increment of array
                else if (cells[leftToRight] != cells[leftToRight + (lengthOfSide + 1)]) {
                    //exit immediate loop by breaking the loop condition
                    leftToRight = cells.length;
                }
            }
        }
        //right to left diagonal check
        //if var column is at position of top right cell
        else if (column == (lengthOfSide - 1)) {
            //for loop that goes from top right cell diagonally to bottom left cell
            for (var rightToLeft = (lengthOfSide - 1); rightToLeft < cells.length; rightToLeft += (lengthOfSide - 1)) {
                //if you reach the end of the diagonal, then all elements are matching
                //if current index of array is not null and the next incremented index is undefined
                if (cells[rightToLeft] != null && cells[rightToLeft + lengthOfSide] === undefined) {
                    console.log("Right to left diagonal wins!");
                    game_over()
                    //exit function
                    return;
                }
                //else if current index of array is not the same as next increment of array
                else if (cells[rightToLeft] != cells[rightToLeft + (lengthOfSide - 1)]) {
                    //exit immediate loop by breaking the loop condition
                    rightToLeft = cells.length;
                }
            }
        }
    }
    //row checker
    //for loop that acts as start point for every row
    for (var row = 0; row < cells.length; row += lengthOfSide) {
        //define var that will keep track how many times the loop runs
        //this solved the problem with the next index of the end of row being the next row
        var numOfLoops = 0;
        //for loop that goes through current row
        for (var column = row; column < (row + lengthOfSide); ++column) {
            //if you reach the end of the row, then all elements are matching
            //if current index of array is not null and you have looped to the end of row
            if (cells[column] != null && numOfLoops == (lengthOfSide - 1)) {
                console.log("Row", ((row / lengthOfSide) + 1), "wins!");
                //set bool gameOver to true
                game_over()
                //exit function
                return;
            }
            //else if current index of array is not the same as next increment of array
            else if (cells[column] != cells[column + 1]) {
                //exit immediate loop by breaking the loop condition
                column = cells.length;
            }
            //increment the count for times looped
            ++numOfLoops;
        }
    }
    //draw checker
    //for loop that checks every element of array cells
    for (var i = 0; i < cells.length; i++) {
        //if current index of array is null,
        if (cells[i] == null) {
            //exit function
            return;
        }
    }
    //call function draw modal here
    gameOverModal('draw');

    gameOver = true;
    console.log("It's a draw!");
}