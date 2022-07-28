import { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPosition, attemptValue }) {
  const { board, secretWord, currentAttempt, setDisabledLetters } =
    useContext(AppContext);
  const letter = board[attemptValue][letterPosition];

  const correct = secretWord[letterPosition] === letter.toLowerCase();
  const almost =
    !correct && letter !== "" && secretWord.includes(letter.toLowerCase());
  const letterState =
    currentAttempt.attempt > attemptValue &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      //   setDisabledLetters([...disabledLetters, letter]);
      setDisabledLetters((prev) => [...prev, letter]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
