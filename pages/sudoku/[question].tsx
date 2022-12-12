import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import {FIREBASE_DOMAIN} from "../../src/global_variables";

import SudokuApp from "../../src/SudokuApp";

const sudoku: React.FC<{ question: string, questionId: string }> = (props: {
  question: string;
  questionId: string;
}) => {
  return <SudokuApp question={props.question} questionId={props.questionId} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          question: "0",
        },
      },
      {
        params: {
          question: "1",
        },
      },
      {
        params: {
          question: "2",
        },
      },
      {
        params: {
          question: "X",
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let sudokuQuestion: string = 
  `0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0`;

  const questionId: string | undefined = context.params?.question?.toString();

  const apiResponse: Response = await fetch(
    `${FIREBASE_DOMAIN}/omocha/sudoku/questions/${questionId}.json`
  );

  if (apiResponse.ok) {
    const data:string = await apiResponse.json();
    if (typeof data === "string") {
      sudokuQuestion = data;
    }
  }

  return {
    props: {
      questionId,
      question: sudokuQuestion,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default sudoku;
