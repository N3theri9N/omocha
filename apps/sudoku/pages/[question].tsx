import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import {FIREBASE_DOMAIN} from "../components/global_variables";

import SudokuApp from "../components/SudokuApp";

const sudoku: React.FC<{ question: string, questionId: string }> = (props: {
  question: string;
  questionId: string;
}) => {
  return <SudokuApp question={props.question} questionId={props.questionId} />;
};

export const getStaticPaths: GetStaticPaths = async () => {

  const response = await fetch(`${FIREBASE_DOMAIN}/omocha/sudoku/questions.json?shallow=true`);
  const data = await response.json();
  const quizData = Object.keys(data); 
  const paths = quizData.map(id => { return {params :{ question: id}};});

  return {
    paths,
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
