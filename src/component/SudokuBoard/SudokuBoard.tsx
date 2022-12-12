import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Group } from "next/dist/shared/lib/router/utils/route-regex";

import classes from "./SudokuBoard.module.css";
import ChangableButton from "./ChangableButton";
import Keypad from "./Keypad";

const SudokuBoard: React.FC<{question:String}> = ({ question }) => {
  // const { isLoading, data: queryData }: any = useQuery<Group[], Error>({
  //   queryKey: ["sudokuQuestion"],
  //   queryFn: () =>
  //     fetch(
  //       "https://react-post-de8f7-default-rtdb.firebaseio.com/omocha/sudoku/questions/0.json", {enabled: false}
  //     ).then((res) => res.json()),

  // });

  const INITIAL_PUZZLE_DATA: number[] = question.split(",")
    .map((n: string) => parseInt(n));

  const [selButtonIdx, setSelButtonIdx] = useState<number>(-1);
  const [puzzleData, setPuzzleData] = useState<number[]>([
    ...INITIAL_PUZZLE_DATA,
  ]);

  const row: number = Math.floor(selButtonIdx / 9) + 1;
  const col: number = Math.floor(selButtonIdx % 9) + 1;

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
      <div className={classes.sudokuBoard}>
        {puzzleData.map((num, idx) => {
          if (INITIAL_PUZZLE_DATA[idx] <= 0) {
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
      <div className={classes.buttonGroup}>
        <button>Submit</button>
      </div>
      {selButtonIdx > -1 && (
        <Keypad
          row={row}
          col={col}
          selButtonIdx={selButtonIdx}
          setSelButtonIdx={setSelButtonIdx}
          changePuzzleData={changePuzzleData}
        />
      )}
    </div>
  );
};

export default SudokuBoard;
