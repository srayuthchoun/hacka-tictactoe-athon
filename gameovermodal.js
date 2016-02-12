function gameOverModal(winner) {
    switch(winner) {
        case 'player1':
            //show modal that player 1 won
            $('#player1-win').show();
            $('#winner-sound').get(0).play();
            break;
        case 'player2':
            //show modal that player 2 won
            $('#player2-win').show();
            $('#winner-sound').get(0).play();
            break;
        default:
            //show "draw"
            $('#draw').show();
            $('#winner-sound').get(0).play();
            break;
    }
}