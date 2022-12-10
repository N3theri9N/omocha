import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { isPropertySignature } from "typescript";
import {FIREBASE_DOMAIN} from "../../src/global_variables";

import SudokuApp from "../../src/SudokuApp";

const sudoku: React.FC<{ question: string }> = (props: {
  question: string;
}) => {
  return <SudokuApp question={props.question} />;
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

  const question: string | undefined = context.params?.question?.toString();

  const apiResponse: Response = await fetch(
    `${FIREBASE_DOMAIN}/omocha/sudoku/questions/${question}.json`
  );

  if (apiResponse.ok) {
    const data:string = await apiResponse.json();
    if (typeof data === "string") {
      sudokuQuestion = data;
    }
  }

  return {
    props: {
      question: sudokuQuestion,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default sudoku;
