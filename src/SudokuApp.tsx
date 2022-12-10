import SudokuBoard from "./component/SudokuBoard/SudokuBoard";
import classes from './SudokuApp.module.css';

const SudokuApp: React.FC<{question:string}> = ({question}) => {

  return (
    <>
      <div className={classes.title}>
        <div>SUDOKU</div>
      </div>
      <SudokuBoard question={question} />
    </>
  );
};

export default SudokuApp;
