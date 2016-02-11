
//parameter type tells what kind of board: 3x3, 5x5, 10x10, 15x15
function new_board(type) {
    $('.cell-container').show();
    $('.cell').remove();

    switch(type) {
        case 'x15-board':
            for(var i = 0; i < 225; i++) {
                $('.cell-container').append($('<div>').addClass('cell x15'));

            }
            break;
        case 'x10-board':
            for(var i = 0; i < 100; i++) {
                $('.cell-container').append($('<div>').addClass('cell x10'));

            }
            break;
        case 'x5-board':
            for(var i = 0; i < 25; i++) {
                $('.cell-container').append($('<div>').addClass('cell x5'));

            }
            break;
        case 'x3-board':
            for(var i = 0; i < 9; i++) {
                $('.cell-container').append($('<div>').addClass('cell x3'));

            }
            break;
    }
}