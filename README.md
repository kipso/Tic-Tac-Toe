# Tic-Tac-Toe

Tic-Tac-Toe is a two-player game played on a 3 x 3 grid. Players take turns. One marks “X” and the other “O”. A winner is declared when one player can align 3 of their markings in a row, in a column, or diagonally. In the event that there are no longer available spaces and no one has won, a tie is declared. Here one of our player is computer and the marks has been chosen randomly. Whoever got the mark "X" will start the game.

For choosing the best spot for computer we use "miniMax" algorithm. Like a professional player, this algorithm sees a few steps ahead and puts itself in the shoes of its opponent.

A Minimax algorithm can be best defined as a recursive function that does the following things:

1.return a value if a terminal state is found (+10, 0, -10)
2.go through available spots on the board
-call the minimax function on each available spot (recursion)
-evaluate returning values from function calls
-and return the best value
