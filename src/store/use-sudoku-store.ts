import { Dispatch, SetStateAction, useState } from "react";

type GS = {
  puzzleData: number[];
  selButtonIdx: number;
};

let globalState: GS = {
  puzzleData: [],
  selButtonIdx: -1,
};

export const SudokuDataStore = () => {
  const setState: Dispatch<SetStateAction<GS>> =
    useState<GS>(globalState)[1];

  const dispatch = (action: String, payload: any) => {
    if (action === "") {
    }
  };
  return [globalState, dispatch];
};

export const initStore = (initialPuzzle:number[]) => {
  globalState = { ...globalState, puzzleData : initialPuzzle };
};
