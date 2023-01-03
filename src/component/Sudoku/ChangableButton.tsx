import React from "react";
import classes from "./ChangableButton.module.css";

const ChangableButton: React.FC<{
  index: number;
  children: number;
  setSelButtonIdx: Function;
  selected: boolean;
  failed: boolean;
}> = ({ index, children, setSelButtonIdx, selected, failed }) => {

  // console.log("RERENDER BUTTON ", index)

  const onClickHandler = () => {
    setSelButtonIdx(index);
  };

  const buttonClass = selected
    ? `${classes.selected} ${classes.changable}`
    : classes.changable;
  const buttonFailed = failed && classes.failed;

  return (
    <button onClick={onClickHandler} className={`${buttonClass} ${buttonFailed}`}>
      {children > 0 && children}
    </button>
  );
};

export default React.memo(ChangableButton);
