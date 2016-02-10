/**
 * Created by Srayuth Choun on 2/10/2016.
 */

var player_x = 1;
var player_o = 0;
var current_player = player_x;

$(document).ready(function(){
    $('.cell').click(function() {
        var active_cell = $(this);
        player_turn(active_cell);
    });
});

function player_turn (active_cell){
    if (current_player == player_x){
        $(active_cell).append("<img src='images/cutterkirby.png'>");
        current_player = player_o;
    }
    else {
        $(active_cell).append("<img src='images/firekirby.png'>");
        current_player = player_x;
    }
}