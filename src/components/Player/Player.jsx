import { useState } from 'react';

/**
 * Player component for displaying and editing player information.
 * @param {string} initialName - The initial name of the player.
 * @param {string} symbol - The symbol of the player ('X' or 'O').
 * @param {boolean} isActive - Whether the player is currently active.
 * @param {Function} onChangeName - Callback function to change the player's name.
 */
function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Handle the edit button click to toggle editing mode and save the new name.
   */
  function handleEditClick() {
    if (isEditing) {
      onChangeName(symbol, playerName); // Update the parent's state with the new name
    }
    setIsEditing((editing) => !editing);
  }

  /**
   * Handle input change event to update the player's name.
   * @param {Event} event - The input change event.
   */
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className={'player-name'}>{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} required onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className={'player-symbol'}>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}

export default Player;
