
//parameter type tells what kind of board: 3x3, 5x5, 10x10, 15x15
function new_board(type) {
    $('.cell-container').show();
    $('.cell').remove();

    switch(type) {
        case 'x15-board':
            //create cells
            for(var i = 0; i < 225; i++) {
                $('.cell-container').append($('<div>').addClass('cell x15'));
            }
            //change array size
            for(var j = 0; j < 225; j++){
                cells.push(null);
            }
            break;
        case 'x10-board':
            //create cells
            for(var i = 0; i < 100; i++) {
                $('.cell-container').append($('<div>').addClass('cell x10'));
            }
            //change array size
            for(var j = 0; j < 100; j++){
                cells.push(null);
            }
            break;
        case 'x5-board':
            //create cells
            for(var i = 0; i < 25; i++) {
                $('.cell-container').append($('<div>').addClass('cell x5'));

            }
            //change array size
            for(var j = 0; j < 25; j++){
                cells.push(null);
            }
            break;
        case 'x3-board':
            //create cells
            for(var i = 0; i < 9; i++) {
                $('.cell-container').append($('<div>').addClass('cell x3'));

            }
            break;
    }
}