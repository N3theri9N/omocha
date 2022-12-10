import { GetStaticProps, GetStaticPropsContext } from "next";
import { isPropertySignature } from "typescript";

import SudokuApp from "../../src/SudokuApp";

const sudoku: React.FC<{ question: string }> = (props: {
  question: string;
}) => {
  return (<SudokuApp question={props.question} />);
};

export async function getStaticPaths() {
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
}

export const getStaticProps: GetStaticProps = async (context) => {
  const question:string|undefined = context.params?.question?.toString();

  const apiResponse = await fetch(`https://react-post-de8f7-default-rtdb.firebaseio.com/omocha/sudoku/questions/${question}.json`); 
  let sudokuQuestion = 
  `0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,`

  if(apiResponse.ok){
    const data = await apiResponse.json()
    sudokuQuestion = data;
  }

  return {
    props: {
      question: sudokuQuestion
    },
    revalidate: 60*60*24,
  };
};

export default sudoku;
