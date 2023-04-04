import { GetServerSideProps } from "next";
import { getSudoku } from 'sudoku-gen';
import { FIREBASE_DOMAIN } from "../../components/global_variables";

import SudokuApp from "../../components/SudokuApp";

const daily: React.FC<{ question: string; questionId: string;}> = (props: {
  question: string;
  questionId: string;
}) => {
  return <SudokuApp question={props.question} questionId={props.questionId} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  let sudokuQuestion: string = `0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0`;

  const date : Date = new Date();
  const dateString: string =`${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDay()}`;
  const fetchResponse = await fetch(
    `${FIREBASE_DOMAIN}/omocha/sudoku/daily/question/${dateString}.json`
  );
  const fetchData = await fetchResponse.json();
  if(fetchData === null){
    const sudoku = getSudoku();
    sudokuQuestion = sudoku.puzzle.replace(/-/g, "0").split("").join(",");
    await fetch(`${FIREBASE_DOMAIN}/omocha/sudoku/daily/question/${dateString}.json`, {
      method: "PUT",
      body : JSON.stringify({
        sudokuQuestion,
        difficulty : sudoku.difficulty,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    sudokuQuestion = fetchData.sudokuQuestion;
  }

  return {
    props: {
      question: sudokuQuestion,
      questionId: dateString
    },
  };
};

export default daily;
