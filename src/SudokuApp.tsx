import Sudoku from "./component/Sudoku/Sudoku";
import classes from './SudokuApp.module.css';

const SudokuApp: React.FC<{question:string}> = ({question}) => {

  return (
    <>
      <div className={classes.title}>
        <div>SUDOKU</div>
      </div>
      <Sudoku question={question} />
    </>
  );
};

export default SudokuApp;
