/**
 * Log component for displaying the list of game turns.
 * @param {Array} turns - The list of game turns.
 */
function Log({ turns }) {
  return (
    <div id="log">
      <h2>Game Log</h2>
      <ul>
        {turns.map((turn, index) => (
          <li key={index}>
            {`Player ${turn.player} move: row ${turn.square.row + 1}, column ${turn.square.col + 1}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Log;
