import { useState } from "react";

import StopWatch from "./StopWatch";
import SudokuBoard from "./SudokuBoard";
import Keypad from "./Keypad";
import ButtonGroup from "./ButtonGroup";
import LeaderBoard from "./LeaderBoard";
import { forEachChild } from "typescript";

const Sudoku: React.FC<{ question: string; questionId: string }> = ({
  question,
  questionId,
}) => {
  const [selButtonIdx, setSelButtonIdx] = useState<number>(-1);
  const [watchIsRunning, setWatchIsRunning] = useState<boolean>(true);
  const [record, setRecord] = useState(0);
  const [wrongIdx, setWrongIdx] = useState<number[]>([]);

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
    const checkCol = (col:number):void  => {
      const colData = newData.filter((item, index) => {
        return index % 9 == col;
      });
      
      for (let i = 0; i < 9; i++) {
        const number = colData[i];
        if (number > 0 && colData.indexOf(number) !== i) {
        wrong.add(i * 9 + col).add(colData.indexOf(number) * 9 + col);
        }
      }
    }

    const checkRow = (row:number):void => {
      const rowData = newData.slice(row * 9, (row + 1) * 9);
      
      for (let i = 0; i < 9; i++) {
        const number = rowData[i];
        if (number > 0 && rowData.indexOf(number) !== i) {
        wrong.add(i + row * 9).add(rowData.indexOf(number) + row * 9);
        }
      }
    }

    const checkSqr = (startIdx:number):void => {
      const sqrData = newData.filter((item, index) => {
        return (
          (startIdx <= index && index < startIdx + 3) ||
          (startIdx + 9 <= index && index < startIdx + 12) ||
          (startIdx + 18 <= index && index < startIdx + 21)
        );
      });

      for(let i = 0 ; i< 9 ; i++){
        const number = sqrData[i];
        const indexof = sqrData.indexOf(number);
        if(number > 0 && indexof !== i){          
        wrong.add( startIdx + ( Math.floor(i/3) * 9 + i%3)).add(startIdx + ( Math.floor(indexof/3) * 9 + indexof%3))
        }
      }
    }
    
    const checkIdxArr = [selButtonIdx, ...wrongIdx];
    const wrong= new Set<number>();

    // which row col sqr should be checked ( not allow duplicate );
    const checkRowSet = new Set<number>();
    const checkColSet = new Set<number>();
    const checkSqrSet = new Set<number>();

    for (let checkIdx of checkIdxArr) {
      const row: number = Math.floor(checkIdx / 9);
      const col: number = Math.floor(checkIdx % 9);
      const sqrStartIdx: number = Math.floor(row/3) * 27 + Math.floor(col/3) * 3;
      checkRowSet.add(row);
      checkColSet.add(col);
      checkSqrSet.add(sqrStartIdx);
    }

    checkRowSet.forEach(checkRow);
    checkColSet.forEach(checkCol);
    checkSqrSet.forEach(checkSqr);
    const newWrongIdx = [...wrong];
    setWrongIdx(newWrongIdx);

    if (
      puzzleData.filter((i) => i > 0).length === 81 &&
      newWrongIdx.length === 0
    ) {
      setWatchIsRunning(false);
    }
  };

  return (
    <>
      <LeaderBoard quizId={questionId} />
      <StopWatch isRunning={watchIsRunning} setRecord={setRecord} />
      <SudokuBoard
        puzzleData={puzzleData}
        initialPuzzldData={INITIAL_PUZZLE_DATA}
        selButtonIdx={selButtonIdx}
        setSelButtonIdx={setSelButtonIdx}
        wrongIdx={wrongIdx}
        isDone={!watchIsRunning}
      />
      {!watchIsRunning && (
        <ButtonGroup record={record} questionId={questionId} />
      )}
      {selButtonIdx > -1 && (
        <Keypad
          selButtonIdx={selButtonIdx}
          setSelButtonIdx={setSelButtonIdx}
          changePuzzleData={changePuzzleData}
        />
      )}
    </>
  );
};

export default Sudoku;
