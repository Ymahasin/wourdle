import { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, secretWord, currentAttempt } = useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>{gameOver.guessedWord ? "You found it!" : "Almost..."}</h3>
      <h1>Correct word: {secretWord}</h1>
      {gameOver.guessedWord && (
        <h3>You got it in {currentAttempt.attempt} attemps.</h3>
      )}
    </div>
  );
}

export default GameOver;
