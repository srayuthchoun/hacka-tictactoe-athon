/**
 *  Created by Srayuth Choun on 2/10/2016.
 */


var cells = [null, null, null, null, null, null, null, null, null];
var kirbys = {
    'cutter': {
        src: 'images/cutterkirby.png',
        name: 'Cutter Kirby'
    },
    'fire': {
        src: 'images/firekirby.png',
        name: 'Fire Kirby'
    }
};
var player_x = kirbys.cutter;
var player_o = kirbys.fire;
var current_player = null;

$(document).ready(function(){
    playerStart(); //Call function to select which player goes first
    $('.cell').click(function() {
        if (!gameOver) {
            var active_cell = $(this);
            player_turn(active_cell); //Function call to process which square has been clicked and store them
            winConditionV2();
        }
    });
});

//Function to set which player goes first
function playerStart() {
    var random_num = Math.floor((Math.random() * 2) + 1); //Generate a random number either 1 or 2
    if(random_num==1){  //Player_x starts first if true
        current_player = player_x;
        console.log('player_x goes first');
    }
    else{
        current_player = player_o;  //Player_o starts first if the above conditional is false
        console.log('player_y goes first');
    }
}
//Function checks which player gets to click first
function player_turn (active_cell){
    if(cells[$(active_cell).index()] == null) { //Checks to make sure current cell has not been clicked
        if (current_player == player_x) { // checks which player gets to click first
            console.log('player_x turn');
            $(active_cell).append("<img src='images/cutterkirby.png'>"); //adds player_x image to the selected div
            cells[$(active_cell).index()] = player_x; //adds player_x click to the array
            current_player = player_o; //Sets current player to player_o
        }
        else {
            console.log('player_o turn');
            $(active_cell).append("<img src='images/firekirby.png'>"); //adds player_o image to the selected div
            cells[$(active_cell).index()] = player_o; //adds player_o click to the array
            current_player = player_x; //Sets current player to player_o
        }
    }
    console.log('active cell: ' + $(active_cell).index());
    console.log('cells array: ', cells);
}





