import { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Letter = ({ letterPosition, attemptValue }) => {
  const { board, secretWord, currentAttempt, setDisabledLetters } =
    useContext(AppContext);
  const letter = board[attemptValue][letterPosition];

  const correct = secretWord[letterPosition] === letter.toLowerCase();
  const almost =
    !correct && letter !== "" && secretWord.includes(letter.toLowerCase());
  let letterState = "";
  if (currentAttempt.attempt > attemptValue) {
    if (correct) {
      letterState = "correct";
    } else if (almost) {
      letterState = "almost";
    } else {
      letterState = "error";
    }
  }

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
