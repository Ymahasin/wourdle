import { useContext } from "react";
import { AppContext } from "../App";

function Key({ value, large, disabled }) {
  const { onDelete, onSelectLetter, onEnter } = useContext(AppContext);

  const selectLetter = () => {
    if (value === "ENTER") {
      onEnter();
    } else if (value === "DEL") {
      onDelete();
    } else {
      onSelectLetter(value);
    }
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="key"
      id={large ? "large" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {value}
    </div>
  );
}

export default Key;
