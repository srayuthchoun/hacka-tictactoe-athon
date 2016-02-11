/**
 *  Created by Srayuth Choun on 2/10/2016.
 */

var player_x = 1;
var player_o = 0;
var current_player = player_x;
var cells = [null, null, null, null, null, null, null, null, null];

function reset() {

}

$(document).ready(function(){


    $('.board-size').click(function(){
        var type = $(this).val();
        console.log(type);
        new_board(type);
        $('#pick-board-size').hide();
    });

    $('.reset').click(function(){
        reset();
    });



    $('.cell-container').on('click', '.cell', function() {
        console.log($(this).index());
        var active_cell = $(this);
        player_turn(active_cell);
    });
});

function player_turn (active_cell){
    if(cells[$(active_cell).index()] == null) {

        if (current_player == player_x) {
            $(active_cell).append("<img src='images/cutterkirby.png'>");
            cells[$(active_cell).index()] = player_x;
            current_player = player_o;
        }
        else {
            $(active_cell).append("<img src='images/firekirby.png'>");
            cells[$(active_cell).index()] = player_o;
            current_player = player_x;
        }
    }
    console.log($(active_cell).index());
    console.log(cells);

}
