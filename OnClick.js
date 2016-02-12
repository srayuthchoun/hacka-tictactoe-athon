/**
 *   Created by Srayuth Choun on 2/10/2016.
 */

var cells = [];

var kirbys = {
    'cutter': {
        src: 'images/cutterkirby.png',
        name: 'Cutter Kirby',
        ability: function(cell_clicked) {
            console.log(lengthOfSide);
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
        name: 'Bomb Kirby',
        ability: function (cell_clicked) {
            var cell_index = $(cell_clicked).index();
            //current
            $('.cell').eq(cell_index).find('img').remove();
            cells[cell_index] = null;
            //top:
            var top_cell = cell_index - lengthOfSide;
            if (cells[top_cell] !== undefined) {
                $('.cell').eq(top_cell).find('img').remove();
                cells[top_cell] = null;
            }
            //bottom:
            var bottom_cell = cell_index + lengthOfSide;
            if (cells[bottom_cell] !== undefined) {
                $('.cell').eq(bottom_cell).find('img').remove();
                cells[bottom_cell] = null;
            }
            //left:
            var left_cell = cell_index + 1;
            if (cells[left_cell] !== undefined) {
                $('.cell').eq(left_cell).find('img').remove();
                cells[left_cell] = null;
            }
            //right:
            var right_cell = cell_index - 1;
            if (cells[right_cell] !== undefined) {
                $('.cell').eq(right_cell).find('img').remove();
                cells[right_cell] = null;
            }

            this.canUseAbility = false;
            this.abilityActiveState = false;

        },
        canUseAbility: true, //this is the button's state: true means it's green, false means it's grey
        abilityActiveState: false //this is if the button was clicked and is ready to use

    },
    'ice': {
        src: 'images/icekirby.png',
        name: 'Ice Kirby',
        ability: function (cell_clicked) {
            var cell_index = $(cell_clicked).index();

            $(cell_clicked).html('<img class="ice" src="images/iceblock.jpg">');
            cells[cell_index] = 'ice';

            this.canUseAbility = false;
            this.abilityActiveState = false;

        },
        canUseAbility: true, //this is the button's state: true means it's green, false means it's grey
        abilityActiveState: false //this is if the button was clicked and is ready to use

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
    ++games_played;
    $('.games-played > .value').text(games_played);
    gameOver = false;
    player_1.canUseAbility = true;
    player_2.canUseAbility = true;
    player_1 = null;
    player_2 = null;
    toMatch = 0;
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

    $('.kirby-select').mouseover(function(){
        if($(this).find('img').attr('src') == kirbys.cutter.src) {
            $('.kirby-ability-desc').text("Cutter Kirby deletes all the Kirbys in a row that you click on.");
        }
        else if($(this).find('img').attr('src') == kirbys.fire.src) {
            $('.kirby-ability-desc').text("Fire Kirby deletes a single Kirby on the cell you click on.");
        }
        else if($(this).find('img').attr('src') == kirbys.ice.src) {
            $('.kirby-ability-desc').text("Ice Kirby disables a single cell you click on from being used.");
        }
        else if($(this).find('img').attr('src') == kirbys.bomb.src) {
            $('.kirby-ability-desc').text("Bomb Kirby deletes all Kirbys on the spaces next to and including the cell you click on.");
        }
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

        reset();

    });

    $('[value="ability"]').click(function() {
        if($(this).hasClass('ability-enabled')) {
            current_player.abilityActiveState = true;
        }
    });



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



     //Checks to make sure current cell has not been clicked
        if (current_player == player_1) { // checks which player gets to click first

            if(player_1.abilityActiveState === true) {
                player_1.ability(active_cell);
            }
            else {
                if(cells[$(active_cell).index()] == null) {
                    $(active_cell).append("<img src='" + player_1.src + "'>"); //adds player_1 image to the selected div
                    cells[$(active_cell).index()] = player_1; //adds player_1 click to the array
                    winConditionV3(active_cell, toMatch);

                }

            }


            current_player = player_2; //Sets current player to player_2
            $('.player-turn > span').text('Player 2\'s Turn');
            $('.game-stats > img').attr('src', player_2.src);
        }
        else {
            if(player_2.abilityActiveState === true) {
                player_2.ability(active_cell);
            }
            else {
                if(cells[$(active_cell).index()] == null) {
                    $(active_cell).append("<img src='" + player_2.src + "'>"); //adds player_2 image to the selected div
                    cells[$(active_cell).index()] = player_2; //adds player_2 click to the array
                    winConditionV3(active_cell, toMatch);

                }
            }

            current_player = player_1; //Sets current player to player_2
            $('.player-turn > span').text('Player 1\'s Turn');
            $('.game-stats > img').attr('src', player_1.src);


    }

    if(current_player.canUseAbility === false) { //makes the ability button grey
        $('[value="ability"]').removeClass('ability-enabled');
        $('[value="ability"]').addClass('ability-disabled');
    }
    else {
        $('[value="ability"]').removeClass('ability-disabled');
        $('[value="ability"]').addClass('ability-enabled');
    }
}





