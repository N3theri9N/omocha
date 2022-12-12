import { useState } from "react";

import classes from "./Sudoku.module.css";
import SudokuBoard from "./SudokuBoard";
import Keypad from "./Keypad";

const Sudoku: React.FC<{ question: String }> = ({ question }) => {
  const [selButtonIdx, setSelButtonIdx] = useState<number>(-1);

  const INITIAL_PUZZLE_DATA: number[] = question
    .split(",")
    .map((n: string) => parseInt(n));

  const [puzzleData, setPuzzleData] = useState<number[]>([
    ...INITIAL_PUZZLE_DATA,
  ]);

  const changePuzzleData = (index: number, num: number) => {
    setSelButtonIdx(-1);
    setPuzzleData((prevData) => {
      const newData: number[] = prevData;
      newData[index] = num;
      return newData;
    });
  };

  return (
    <div className={classes.container}>
      <SudokuBoard
        puzzleData={puzzleData}
        initialPuzzldData={INITIAL_PUZZLE_DATA}
        selButtonIdx={selButtonIdx}
        setSelButtonIdx={setSelButtonIdx}
      />
      <div className={classes.buttonGroup}>
        <button>Submit</button>
      </div>
      {selButtonIdx > -1 && (
        <Keypad
          selButtonIdx={selButtonIdx}
          setSelButtonIdx={setSelButtonIdx}
          changePuzzleData={changePuzzleData}
        />
      )}
    </div>
  );
};

export default Sudoku;
