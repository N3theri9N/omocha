import React, { useState } from "react";
import classes from "./ChangableButton.module.css";

const ChanbableButton: React.FC<{
  index: number;
  setSelButtonIdx: Function;
  selected: boolean;
}> = ({ index, setSelButtonIdx, selected }) => {
  const onClickHandler = () => {
    setSelButtonIdx(index);
  };

  const buttonClass = selected ? classes.selected : classes.changable;

  return (
    <button onClick={onClickHandler} className={buttonClass}></button>
  );
};

export default ChanbableButton;
