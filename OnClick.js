/**
 *   Created by Srayuth Choun on 2/10/2016.
 */

var cells = [];

var kirbys = {
    'cutter': {
        src: 'images/cutterkirby.png',
        name: 'Cutter Kirby',
        ability: function(cell_clicked) {
            var cell_index = $(cell_clicked).index();
            var row = Math.floor(cell_index / lengthOfSide) + 1;
            var firstCellInRow = lengthOfSide * (row - 1);
            var lastCellInRow = (lengthOfSide * row) - 1;
            for(var i = firstCellInRow; i <= lastCellInRow; i++) {
                cells[i] = null;
                $('.cell').eq(i).find('img').remove();
            }
            this.canUseAbility = false;
            this.abilityActiveState = false;

        },
        canUseAbility: true, //this is the button's state: true means it's green, false means it's grey
        abilityActiveState: false //this is if the button was clicked and is ready to use
    },
    'fire': {
        src: 'images/firekirby.png',
        name: 'Fire Kirby',
        ability: function(cell_clicked) {
            var cell_index = $(cell_clicked).index();
            $(cell_clicked).find('img').remove();
            cells[cell_index] = null;

            this.canUseAbility = false;
            this.abilityActiveState = false;
        },
        canUseAbility: true, //this is the button's state: true means it's green, false means it's grey
        abilityActiveState: false //this is if the button was clicked and is ready to use
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


function update_wins() {
    $('.player1-score .value').text(player1_wins);
    $('.player2-score .value').text(player2_wins);

}

function game_over() {
    gameOver = true;
    if(current_player == player_1) {
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
    gameOver = false;
    player_1.canUseAbility = true;
    player_2.canUseAbility = true;
    player_1 = null;
    player_2 = null;
    $('.cell-container').hide();
    $('#pick-board-size').hide();
    $('.kirby-select').parent().show();
    $('.kirby-select').show();
    $('.gameovermodal').hide();
    $('[value="ability"]').removeClass('ability-disabled');
    $('[value="ability"]').addClass('ability-enabled');

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
    });
    //reset onclick function
    $('.game-stats').on('click', '.reset', function(){
        console.log("reset");
        reset();
    });

    $('[value="ability"]').click(function() {
        if($(this).hasClass('ability-enabled')) {
            current_player.abilityActiveState = true;
        }
    });


    playerStart(); //Call function to select which player goes first
    $('.cell-container').on('click', '.cell', function() {
        if (!gameOver) {
            var active_cell = $(this);
            player_turn(active_cell); //Function call to process which square has been clicked and store them
        }
    });
});

//Function to set which player goes first
function playerStart() {
    var random_num = Math.floor((Math.random() * 2) + 1); //Generate a random number either 1 or 2
    if(random_num==1){  //player_1 starts first if true
        current_player = player_1;
        console.log('player_1 goes first');
    }
    else{
        current_player = player_2;  //player_2 starts first if the above conditional is false
        console.log('player_2 goes first');
    }
}
//Function checks which player gets to click first
function player_turn (active_cell){



     //Checks to make sure current cell has not been clicked
        if (current_player == player_1) { // checks which player gets to click first
            if(player_1.abilityActiveState === true) {
                player_1.ability(active_cell);
            }
            else {
                if(cells[$(active_cell).index()] == null) {
                    $(active_cell).append("<img src='" + player_1.src + "'>"); //adds player_1 image to the selected div
                    cells[$(active_cell).index()] = player_1; //adds player_1 click to the array
                }

            }
            winConditionV2();
            current_player = player_2; //Sets current player to player_2
        }
        else {
            if(player_2.abilityActiveState === true) {
                player_2.ability(active_cell);
            }
            else {
                if(cells[$(active_cell).index()] == null) {
                    $(active_cell).append("<img src='" + player_2.src + "'>"); //adds player_2 image to the selected div
                    cells[$(active_cell).index()] = player_2; //adds player_2 click to the array

                }
            }
            winConditionV2();
            current_player = player_1; //Sets current player to player_2


    }

    if(current_player.canUseAbility === false) { //makes the ability button grey
        $('[value="ability"]').removeClass('ability-enabled');
        $('[value="ability"]').addClass('ability-disabled');
    }
    else {
        $('[value="ability"]').removeClass('ability-disabled');
        $('[value="ability"]').addClass('ability-enabled');
    }

    console.log('active cell: ' + $(active_cell).index());
    console.log('cells array: ', cells);
}





