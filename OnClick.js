/**
 *   Created by Srayuth Choun on 2/10/2016.
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
    },
    'bomb': {
        src: 'images/bombkirby.png',
        name: 'Bomb Kirby'
    },
    'ice': {
        src: 'images/icekirby.png',
        name: 'Ice Kirby'
    }
};
var player_1;
var player_2;
var current_player = null;
var games_played = 0;

function reset() {

}

function findKirby(src) {
    var foundKirby;
    for(var kirbytype in kirbys) {
        if(src === kirbys[kirbytype].src) {
            foundKirby = kirbytype;
            console.log("found kirby! it's " + kirbytype);
        }
    }
    return foundKirby;
}

$(document).ready(function(){
    $('#pick-board-size').hide();
    $('.cell-container').hide();

    $('.kirby-select').click(function(){
        var chosenKirby;
        if($(this).parent().hasClass('pick-player1')) {
            chosenKirby = findKirby($(this).find('img').attr('src'));
            player_1 = kirbys[chosenKirby];
            //remove the chosen kirby so that next player can't select it
            $("[src='" + $(this).find('img').attr('src') + "']").parent().hide();
            console.log("player 1 is ", player_1);
        }
        else {
            player_2 = kirbys[findKirby($(this).find('img').attr('src'))];
            $('#pick-board-size').show();
            console.log("player 1 is ", player_2);
        }
        $(this).parent().hide();

    });

    $('.board-size').click(function(){
        var type = $(this).val();
        console.log(type);
        new_board(type);
        $('#pick-board-size').hide();
        playerStart(); //Call function to select which player goes first
    });
    //reset onclick function
    $('.game-stats').on('click', '.reset', function(){
        console.log("reset");
        cells = [null, null, null, null, null, null, null, null, null];
        gameOver = false;
        ++games_played;
        player_1 = null;
        player_2 = null;
        $('.games-played > .value').text(games_played);
        $('.cell-container').hide();
        $('.kirby-select').parent().show();
        $('.kirby-select').show();
        $('.game-stats > img').attr('src', 'images/angrykirby.png');
    });



    $('.cell-container').on('click', '.cell', function() {
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
    if(random_num==1){  //player_1 starts first if true
        current_player = player_1;
        console.log('player_1 goes first');
        $('.player-turn > span').text('Player 1 Starts');
        $('.game-stats > img').attr('src', player_1.src);
    }
    else{
        current_player = player_2;  //player_2 starts first if the above conditional is false
        console.log('player_2 goes first');
        $('.player-turn > span').text('Player 2 Starts');
        $('.game-stats > img').attr('src', player_2.src);
    }

}

//Function checks which player gets to click first
function player_turn (active_cell){
    if(cells[$(active_cell).index()] == null) { //Checks to make sure current cell has not been clicked
        if (current_player == player_1) { // checks which player gets to click first
            console.log('player_1 turn');
            $(active_cell).append("<img src='" + player_1.src + "'>"); //adds player_1 image to the selected div
            cells[$(active_cell).index()] = player_1; //adds player_1 click to the array
            current_player = player_2; //Sets current player to player_2
            $('.player-turn > span').text('Player 2\'s Turn');
            $('.game-stats > img').attr('src', player_2.src);
        }
        else {
            console.log('player_2 turn');
            $(active_cell).append("<img src='" + player_2.src + "'>"); //adds player_2 image to the selected div
            cells[$(active_cell).index()] = player_2; //adds player_2 click to the array
            current_player = player_1; //Sets current player to player_2
            $('.player-turn > span').text('Player 1\'s Turn');
            $('.game-stats > img').attr('src', player_1.src);
        }
    }

    console.log('active cell: ' + $(active_cell).index());
    console.log('cells array: ', cells);
}





