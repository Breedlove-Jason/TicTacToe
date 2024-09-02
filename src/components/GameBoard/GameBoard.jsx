/**
 * GameBoard component for rendering the Tic-Tac-Toe grid.
 * @param {Function} onSelectSquare - Callback function to handle the selection of a square.
 * @param {Array} board - The current state of the game board.
 */
function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id={'game-board'}>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex} className={'col'}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol != null} // Disable the button if the square is already filled
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
