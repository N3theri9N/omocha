import React, { useState } from "react";

import classes from "./SudokuBoard.module.css";
import ChangableButton from "./ChagableButton";

const PUZZLE_DATA:number[] = [
  0,0,0,2,6,0,7,0,1,
  6,8,0,0,7,0,0,9,0,
  1,9,0,0,0,4,5,0,0,
  8,2,0,1,0,0,4,0,0,
  0,0,4,6,0,2,9,0,0,
  0,5,0,0,0,3,0,2,8,
  0,0,9,3,0,0,0,7,4,
  0,4,0,0,5,0,0,3,6,  
  7,0,3,0,1,8,0,0,0
];

const SudokuBoard: React.FC = () => {
  const [selButtonIdx, setSelButtonIdx] = useState<number>(-1);
  const [puzzleData, setPuzzleData] = useState<number[]>(PUZZLE_DATA);

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
  
  console.log(puzzleData);

  return (
    <div className={classes.container}>
      <div className={classes.sudokuBoard}>
        {PUZZLE_DATA.map((num, idx) => {
          if (num <= 0) {
            return (
              <ChangableButton
                key={idx}
                setSelButtonIdx={setSelButtonIdx}
                index={+idx}
                selected={idx === selButtonIdx}
              />
            );
          } else {
            return <button key={idx}>{num}</button>;
          }
        })}
      </div>
      <div className={classes.buttonGroup}>
        <button>Submit</button>
      </div>
      {selButtonIdx > -1 && (
        <div className={classes.keypadSection}>
          <div className={classes.head}>
            <div></div>
            <div>SELECT NUMBER OF ROW {row} , COL {col}</div>
            <div>
              <button
                onClick={() => {
                  setSelButtonIdx(-1);
                }}
                className={classes.close}
              >
                X
              </button>
            </div>
          </div>
          <div className={classes.keypad}>
            <button onClick={()=> changePuzzleData(selButtonIdx, 1)}>1</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 2)}>2</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 3)}>3</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 4)}>4</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 5)}>5</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 6)}>6</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 7)}>7</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 8)}>8</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 9)}>9</button>
            <button onClick={()=> changePuzzleData(selButtonIdx, 0)}>
              <img src="svg/eraser.svg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SudokuBoard;
