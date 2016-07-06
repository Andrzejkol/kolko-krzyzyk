$(function () {

    var squares = [],
            SIZE = 3,
            EMPTY = "empty",
            score,
            moves,
            turn = "Czerwony",
            /*
             wartości liczbowe oznazające wygraną
			 suma wartości pól
             */
            wins = [7, 56, 448, 73, 146, 292, 273, 84],
            /*
             start gry i czyszczenie zmiennych
             */
            startNewGame = function () {
                turn = "Czerwony";
                score = {"Czerwony": 0, "Niebieski": 0};
                moves = 0;
                squares.forEach(function (square) {
                    square.attr('class', EMPTY);
                });
            },
            /*
             określenie wygranego
             */
            win = function (score) {
                for (var i = 0; i < wins.length; i += 1) {
                    if ((wins[i] & score) === wins[i]) {
                        return true;
                    }
                }
                return false;
            },
            /*
             określenie aktualnego gracza i sprawdzenie wyników
             */
            set = function () {

                if ($(this).attr('class') !== EMPTY) {
                    return;
                }
                $(this).attr('class', turn);

                moves += 1;
                score[turn] += $(this)[0].indicator;
                if (win(score[turn])) {
                    alert(turn + " Wygrał!");
                    startNewGame();
                } else if (moves === SIZE * SIZE) {
                    alert("Remis!");
                    startNewGame();
                } else {
                    turn = turn === "Czerwony" ? "Niebieski" : "Czerwony";
                }
            },
            /*
             utworzenie tabelki do grania
			 indicator -> wartość liczbowa pola która po kliknięciu 
			 dodaje sie do zmiennej sumy dla aktualnego gracza
             */
            play = function () {
                var board = $("<table border=1 cellspacing=0>"), indicator = 1;
                for (var i = 0; i < SIZE; i += 1) {
                    var row = $("<tr>");
                    board.append(row);
                    for (var j = 0; j < SIZE; j += 1) {
						/* html dla pojedynczego pola*/
                        var cell = $('<td data-indicator="'+indicator+'"></td>');
                        cell[0].indicator = indicator;
						/* ustawienie funkcji reagującej na kliknięcie w pole*/
                        cell.click(set);
						/* dodanie pola do wiersza*/
                        row.append(cell);
						/*  */
                        squares.push(cell);
                        indicator += indicator;
						/* indicator zmienia się 2x dla następnego pola*/
                    }
                }

                $("#game_area").append(board);
                startNewGame();
            };

    play();
    
    $('body').css('min-height',window.innerHeigth);
});