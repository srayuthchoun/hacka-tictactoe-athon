/**
 *   Created by Srayuth Choun on 2/10/2016.
 */


var cells = [];
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
var player1_wins = 0;
var player2_wins = 0;
var games_played = 0;
var toMatch = 0;


function update_wins() {
    $('.player1-score .value').text(player1_wins);
    $('.player2-score .value').text(player2_wins);

}

function game_over() {
    gameOver = true;
    if (current_player == player_1) {
        gameOverModal('player1');
        player1_wins++;
    }
    else {
        gameOverModal('player2');
        player2_wins++;
    }
    update_wins();
}

function reset() {
    cells = [];
    ++games_played;
    $('.games-played > .value').text(games_played);
    gameOver = false;
    player_1 = null;
    player_2 = null;
    toMatch = 0;
    $('.cell-container').hide();
    $('#pick-board-size').hide();
    $('.kirby-select').parent().show();
    $('.kirby-select').show();
    $('.gameovermodal').hide();
}

function findKirby(src) {
    var foundKirby;
    for (var kirbytype in kirbys) {
        if (src === kirbys[kirbytype].src) {
            foundKirby = kirbytype;
            console.log("found kirby! it's " + kirbytype);
        }
    }
    return foundKirby;
}

$(document).ready(function () {
    //selection for picking kirby
    $('.kirby-select').click(function () {
        var chosenKirby;
        if ($(this).parent().hasClass('pick-player1')) {
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

    //when user clicks what board size they want
    $('.board-size').click(function () {
        var type = $(this).val();
        console.log(type);
        new_board(type);
        $('#pick-board-size').hide();
        playerStart(); //Call function to select which player goes first
    });

    //reset onclick function
    $('.game-stats').on('click', '.reset', function () {
        reset();
    });


    $('.cell-container').on('click', '.cell', function () {
        if (!gameOver) {
            var active_cell = $(this);
            player_turn(active_cell); //Function call to process which square has been clicked and store them
        }
    });
});

//Function to set which player goes first
function playerStart() {
    var random_num = Math.floor((Math.random() * 2) + 1); //Generate a random number either 1 or 2
    if (random_num == 1) {  //player_1 starts first if true
        current_player = player_1;
        console.log('player_1 goes first');
        $('.player-turn > span').text('Player 1 Starts');
        $('.game-stats > img').attr('src', player_1.src);
    }
    else {
        current_player = player_2;  //player_2 starts first if the above conditional is false
        console.log('player_2 goes first');
        $('.player-turn > span').text('Player 2 Starts');
        $('.game-stats > img').attr('src', player_2.src);
    }

}

//Function checks which player gets to click first
function player_turn(active_cell) {
    if (cells[$(active_cell).index()] == null) { //Checks to make sure current cell has not been clicked
        if (current_player == player_1) { // checks which player gets to click first
            $(active_cell).append("<img src='" + player_1.src + "'>"); //adds player_1 image to the selected div
            cells[$(active_cell).index()] = player_1.name; //adds player_1 click to the array
            winConditionV3(active_cell, toMatch);
            current_player = player_2; //Sets current player to player_2
            $('.player-turn > span').text('Player 2\'s Turn');
            $('.game-stats > img').attr('src', player_2.src);
        }
        else {
            $(active_cell).append("<img src='" + player_2.src + "'>"); //adds player_2 image to the selected div
            cells[$(active_cell).index()] = player_2.name; //adds player_2 click to the array
            winConditionV3(active_cell, toMatch);
            current_player = player_1; //Sets current player to player_2
            $('.player-turn > span').text('Player 1\'s Turn');
            $('.game-stats > img').attr('src', player_1.src);
        }
    }
}





