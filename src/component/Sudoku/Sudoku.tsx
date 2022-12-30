import { useState } from "react";

import classes from "./Sudoku.module.css";
import StopWatch from "./StopWatch";
import SudokuBoard from "./SudokuBoard";
import Keypad from "./Keypad";
import ButtonGroup from "./ButtonGroup";
import LeaderBoard from "./LeaderBoard";

const Sudoku: React.FC<{ question: string; questionId: string }> = ({
  question,
  questionId,
}) => {
  const [selButtonIdx, setSelButtonIdx] = useState<number>(-1);
  const [watchIsRunning, setWatchIsRunning] = useState<boolean>(true);
  const [record, setRecord] = useState(0);
 
  const INITIAL_PUZZLE_DATA: number[] = question
    .split(",")
    .map((n: string) => parseInt(n));

  const [puzzleData, setPuzzleData] = useState<number[]>([
    ...INITIAL_PUZZLE_DATA,
  ]);

  const changePuzzleData = (index: number, num: number): void => {
    setSelButtonIdx(-1);
    setPuzzleData((prevData) => {
      const newData: number[] = prevData;
      newData[index] = num;
      checkIsDone(newData);
      return newData;
    });
  };

  const checkIsDone = (newData: number[]) => {
    if (checkRow(newData) && checkCol(newData) && checkSquare(newData)) {
      setWatchIsRunning(false);
    }
  };

  const checkCompleted = (arrNumber: number[]): boolean => {
    const unDuplicatedArr = new Set<number>(
      arrNumber.filter((item: number) => item > 0)
    );
    return [...unDuplicatedArr].length === 9;
  };

  const checkRow = (newData: number[]): boolean => {
    for (let i: number = 0; i < 9; i++) {
      const row = newData.slice(i * 9, (i + 1) * 9);
      if (checkCompleted(row) === false) {
        return false;
      }
    }
    return true;
  };

  const checkCol = (newData: number[]): boolean => {
    for (let i: number = 0; i < 9; i++) {
      const col = newData.filter((item, index) => {
        return index % 9 == i;
      });
      if (checkCompleted(col) === false) {
        return false;
      }
    }
    return true;
  };

  const checkSquare = (newData: number[]): boolean => {
    for (let i: number = 0; i < 3; i++) {
      for (let j: number = 0; j < 3; j++) {
        const startIdx = 27 * i + 3 * j;
        const square = newData.filter((item, index) => {
          return (
            (startIdx <= index && index < startIdx + 3) ||
            (startIdx + 9 <= index && index < startIdx + 12) ||
            (startIdx + 18 <= index && index < startIdx + 21)
          );
        });
        if (checkCompleted(square) === false) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className={classes.container}>
      <LeaderBoard quizId={questionId} />
      <StopWatch isRunning={watchIsRunning} setRecord={setRecord} />
      <SudokuBoard
        puzzleData={puzzleData}
        initialPuzzldData={INITIAL_PUZZLE_DATA}
        selButtonIdx={selButtonIdx}
        setSelButtonIdx={setSelButtonIdx}
        isDone={!watchIsRunning}
      />
      {watchIsRunning || (
        <ButtonGroup record={record} questionId={questionId} />
      )}
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
