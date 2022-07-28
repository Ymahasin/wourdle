/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useCallback, useContext } from "react";
import { AppContext } from "../App";
import Key from "./Key";

export const Keyboard = () => {
  const { onDelete, onSelectLetter, onEnter, disabledLetters } =
    useContext(AppContext);
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // useCallback helps to prevent ....todo
  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      // handle letter
      keys1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });

      keys2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });

      keys3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="keyboard" onKeyDown={handleKeyPress}>
      <div className="line1">
        {keys1.map((key, index) => (
          <div key={`${keys1.length},${index.toString()}`}>
            <Key value={key} disabled={disabledLetters.includes(key)} />
          </div>
        ))}
      </div>
      <div className="line2">
        {keys2.map((key, index) => (
          <div key={`${keys2.length},${index.toString()}`}>
            <Key value={key} disabled={disabledLetters.includes(key)} />
          </div>
        ))}
      </div>
      <div className="line3">
        <Key value={"ENTER"} large={true} />
        {keys3.map((key, index) => (
          <div key={`${keys3.length},${index.toString()}`}>
            <Key value={key} disabled={disabledLetters.includes(key)} />
          </div>
        ))}
        <Key value={"DEL"} large={true} />
      </div>
    </div>
  );
};
