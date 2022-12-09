import React, { useState } from "react";

import classes from "./SudokuBoard.module.css";
import ChangableButton from "./ChagableButton";
import Keypad from "./Keypad";

const INITIAL_PUZZLE_DATA:number[] = [
  0,6,0,3,0,0,8,0,4,
  5,3,7,0,9,0,0,0,0,
  0,4,0,0,0,6,3,0,7,
  0,9,0,0,5,1,2,3,8,
  0,0,0,0,0,0,0,0,0,
  7,1,3,6,2,0,0,4,0,
  3,0,6,4,0,0,0,1,0,
  0,0,0,0,6,0,5,2,3,
  1,0,2,0,0,9,0,8,0,
];

const SudokuBoard: React.FC = () => {
  const [selButtonIdx, setSelButtonIdx] = useState<number>(-1);  
  const [puzzleData, setPuzzleData] = useState<number[]>([...INITIAL_PUZZLE_DATA]);

  const row: number = Math.floor(selButtonIdx/9) + 1;
  const col: number = Math.floor(selButtonIdx%9) + 1;

  const changePuzzleData = (index:number, num:number) => {
    setSelButtonIdx(-1);
    setPuzzleData((prevData) => {
      const newData:number[] = prevData;
      newData[index] = num;
      return newData;
    });
  }


  return (
    <div className={classes.container}>
      <div className={classes.sudokuBoard}>
        {puzzleData.map((num, idx) => {
          if (INITIAL_PUZZLE_DATA[idx] <= 0) {
            return (
              <ChangableButton
                key={idx}
                setSelButtonIdx={setSelButtonIdx}
                index={+idx}
                selected={idx === selButtonIdx}
              >{+num}</ChangableButton>
            );
          } else {
            return <button className={classes.fixed} key={idx}>{num}</button>;
          }
        })}
      </div>
      <div className={classes.buttonGroup}>
        <button>Submit</button>
      </div>
      {selButtonIdx > -1 && (
          <Keypad row={row} col={col} selButtonIdx={selButtonIdx} setSelButtonIdx={setSelButtonIdx} changePuzzleData={changePuzzleData} />
      )}
    </div>
  );
};

export default SudokuBoard;
