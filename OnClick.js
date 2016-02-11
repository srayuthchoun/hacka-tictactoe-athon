/**
 *  Created by Srayuth Choun on 2/10/2016.
 */

var player_x = 1;
var player_o = 0;
var current_player = player_x;
var cells = [null, null, null, null, null, null, null, null, null];

$(document).ready(function(){
    $('.cell').click(function() {
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
