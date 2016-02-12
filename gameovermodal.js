function gameOverModal(winner) {
    switch(winner) {
        case 'player1':
            //show modal that player 1 won
            $('#player1-win').show();
            player1_wins++;
            $('.player1-score .value').text(player1_wins);
            $('#winner-sound').get(0).play();
            break;
        case 'player2':
            //show modal that player 2 won
            $('#player2-win').show();
            player2_wins++;
            $('.player2-score .value').text(player1_wins);
            $('#winner-sound').get(0).play();
            break;
        default:
            //show "draw"
            $('#draw').show();
            $('#winner-sound').get(0).play();
            break;
    }
}