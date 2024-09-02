/**
 * GameOver component for displaying the game over message.
 * @param {string} winner - The name of the winning player.
 * @param {Function} onRestart - Callback function to restart the game.
 */
function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <p>{winner ? `${winner} wins!` : "It's a draw!"}</p>
      <button onClick={onRestart}>Rematch!</button>
    </div>
  );
}

export default GameOver;
