import React from "react";
import classes from "./ChangableButton.module.css";

const ChangableButton: React.FC<{
  index: number;
  children: number;
  setSelButtonIdx: Function;
  selected: boolean;
  wrong: boolean;
}> = ({ index, children, setSelButtonIdx, selected, wrong }) => {
  const onClickHandler = () => {
    setSelButtonIdx(index);
  };

  const selectedClass = selected && classes.selected;
  const wrongClass = wrong && classes.wrong;

  return (
    <button
      onClick={onClickHandler}
      className={`${classes.changable} ${selectedClass} ${wrongClass}`}
    >
      {children > 0 && children}
    </button>
  );
};

export default React.memo(ChangableButton);
