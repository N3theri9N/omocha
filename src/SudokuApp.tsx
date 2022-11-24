import SudokuBoard from "./component/SudokuBoard/SudokuBoard";
import classes from './SudokuApp.module.css';

const SudokuApp: React.FC = () => {
  return (
    <>
      <div className={classes.title}>
        <div>SUDOKU</div>
      </div>
      <SudokuBoard />
    </>
  );
};

export default SudokuApp;
