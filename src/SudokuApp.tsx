import Sudoku from "./component/Sudoku/Sudoku";
import classes from "./SudokuApp.module.css";

const SudokuApp: React.FC<{ question: string; questionId: string }> = ({
  question,
  questionId,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <div>SUDOKU</div>
      </div>
      <Sudoku question={question} questionId={questionId} />
    </div>
  );
};

export default SudokuApp;
