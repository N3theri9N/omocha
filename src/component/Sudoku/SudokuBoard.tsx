import React, { Dispatch, SetStateAction, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Group } from "next/dist/shared/lib/router/utils/route-regex";

import classes from "./SudokuBoard.module.css";
import ChangableButton from "./ChangableButton";

const SudokuBoard: React.FC<{
  puzzleData: number[];
  initialPuzzldData: number[];
  selButtonIdx: number;
  setSelButtonIdx: Dispatch<SetStateAction<number>>;
  isDone: boolean;
}> = ({
  puzzleData,
  initialPuzzldData,
  selButtonIdx,
  setSelButtonIdx,
  isDone,
}) => {
  if (isDone) {
    return (
      <div className={classes.sudokuBoard}>
        {puzzleData.map((num, idx) => {
          return (
            <button className={classes.fixed} key={idx}>
              {num}
            </button>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={classes.sudokuBoard}>
        {puzzleData.map((num, idx) => {
          if (initialPuzzldData[idx] <= 0) {
            return (
              <ChangableButton
                key={idx}
                setSelButtonIdx={setSelButtonIdx}
                index={+idx}
                selected={idx === selButtonIdx}
              >
                {+num}
              </ChangableButton>
            );
          } else {
            return (
              <button className={classes.fixed} key={idx}>
                {num}
              </button>
            );
          }
        })}
      </div>
    );
  }
};

export default SudokuBoard;
