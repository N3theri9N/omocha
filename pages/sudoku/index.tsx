import { GetServerSideProps } from "next";
import { FIREBASE_DOMAIN } from "../../src/global_variables";

export default function Index(){
  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${FIREBASE_DOMAIN}/omocha/sudoku/questions.json?shallow=true`);
  const data = await response.json();
  const quizData = Object.keys(data); 
  const idx = Math.floor(Math.random() * quizData.length);
  return {
    redirect : {
      destination : `/sudoku/${quizData[idx]}`,
      permanent: true,
    },
    props : {}
  }
}
