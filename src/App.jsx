import { useState } from 'react';
import Player from './components/Player/Player.jsx';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import Log from './components/Log/Log.jsx';
import { WINNING_COMBINATIONS } from './winningCombinations.js';
import GameOver from './components/GameOver/GameOver.jsx';

/**
 * Derive the active player based on the last move.
 * @param {Array} gameTurns - The list of game turns.
 * @returns {string} The symbol of the active player ('X' or 'O').
 */
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState({ X: 'Player 1', O: 'Player 2' });
  const [gameTurns, setGameTurns] = useState([]);
  const [winner, setWinner] = useState(null);

  const activePlayer = deriveActivePlayer(gameTurns);

  // Deep copy of the initial game board
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  // Update game board based on the turns played
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  // Check for a winner if there isn't one already
  if (!winner) {
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];

      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        setWinner(players[firstSquareSymbol]); // Set the winner's name
      }
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  /**
   * Handle the selection of a square by a player.
   * @param {number} rowIndex - The row index of the selected square.
   * @param {number} colIndex - The column index of the selected square.
   */
  function handleSelectSquare(rowIndex, colIndex) {
    if (winner || hasDraw) return; // Prevent further moves if there's a winner or a draw

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  /**
   * Restart the game by resetting the game state.
   */
  function handleRestartGame() {
    setGameTurns([]);
    setWinner(null);
  }

  /**
   * Handle changing a player's name.
   * @param {string} symbol - The symbol of the player ('X' or 'O').
   * @param {string} newName - The new name of the player.
   */
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* Players List */}
        <ol id={'players'} className={'highlight-player'}>
          <Player
            initialName={'Player 1'}
            symbol={'X'}
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={'Player 2'}
            symbol={'O'}
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* Game Board */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestartGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      {/* Log of Turns */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
