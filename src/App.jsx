import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";

function App() {
  return (
    <main>
      <div id="game-container">
        {/*PLAYERS*/}
        <ol id={"players"}>
          <Player initialName={"Player 1"} symbol={"X"} />
          <Player initialName={"Player 2"} symbol={"O"} />
        </ol>

        {/*GAME BOARD*/}
          <GameBoard />
      </div>
      {/*LOG*/}
    </main>
  );
}

export default App;
