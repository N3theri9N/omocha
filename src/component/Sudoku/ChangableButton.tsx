import React from "react";
import classes from "./ChangableButton.module.css";

const ChangableButton: React.FC<{
  index: number;
  children: number;
  setSelButtonIdx: Function;
  selected: boolean;
}> = ({ index, children, setSelButtonIdx, selected }) => {
  const onClickHandler = () => {
    setSelButtonIdx(index);
  };

  const buttonClass = selected
    ? `${classes.selected} ${classes.changable}`
    : classes.changable;

  return (
    <button onClick={onClickHandler} className={buttonClass}>
      {children > 0 && children}
    </button>
  );
};

export default React.memo(ChangableButton);
