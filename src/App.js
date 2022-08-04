/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { createContext, useState } from "react";
import "./App.css";
import { Board } from "./Components/Board";
import GameOver from "./Components/GameOver";
import { Keyboard } from "./Components/Keyboard";
import { boardDefault } from "./Components/Words";
import { db } from "./firebase-config";
import { collection, getDocs } from "@firebase/firestore";

export const AppContext = createContext();
function App() {
  const wordCollectionRef = collection(db, "secretWords");
  const [secretWord, setSecretWord] = useState("");
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    const getWords = async () => {
      const data = await getDocs(wordCollectionRef);
      const result =
        data.docs[0]._document.data.value.mapValue.fields.words.arrayValue
          .values;

      setSecretWord(
        result[Math.floor(Math.random() * result.length)].stringValue
      );
      const wordArray = [];
      result.forEach((entry) => wordArray.push(entry.stringValue));
      setWordSet(new Set(wordArray));
    };
    getWords();
  }, []);

  const getNewSecretWord = () => {
    setGameOver({ gameOver: false, guessedWord: false });
    setCurrentAttempt({ attempt: 0, letterPosition: 0 });
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setDisabledLetters([]);

    const words = Array.from(wordSet);
    setSecretWord(words[Math.floor(Math.random() * words.length)]);
  };

  const onSelectLetter = (value) => {
    if (currentAttempt.letterPosition > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = value;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition + 1,
    });
  };

  const onDelete = () => {
    // cant delete when theres nothing there
    if (currentAttempt.letterPosition === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPosition: currentAttempt.letterPosition - 1,
    });
  };

  const onEnter = () => {
    // dont let them ENTER when they haven't filled out each cell
    if (currentAttempt.letterPosition !== 5) return;

    let currentWord = "";
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      // if each cell is filled out - let them his enter and update the row
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPosition: 0,
      });
    } else {
      alert("word not in Set");
    }

    if (currentWord.toLowerCase() === secretWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };
  return (
    <div className="App">
      <nav className="App-header">
        <h1>Wourdle</h1>
      </nav>

      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          secretWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />

          {gameOver.gameOver ? (
            <div>
              <GameOver />{" "}
              <button className="button" onClick={getNewSecretWord}>
                Play Again
              </button>
            </div>
          ) : (
            <Keyboard />
          )}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
