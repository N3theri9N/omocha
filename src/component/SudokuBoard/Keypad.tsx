import classes from "./Keypad.module.css";

const Keypad: React.FC<{
  row: number;
  col: number;
  selButtonIdx: number;
  setSelButtonIdx: Function;
  changePuzzleData: Function;
}> = ({row, col, selButtonIdx, setSelButtonIdx, changePuzzleData}) => {
  return (
    <div className={classes.keypadSection}>
      <div className={classes.head}>
        <div>
          
        </div>
        <div>
          SELECT NUMBER OF ROW {row} , COL {col}
        </div>
        <div>
          <button
            onClick={() => {
              setSelButtonIdx(-1);
            }}
            className={classes.close}
          >
            X
          </button>
        </div>
      </div>
      <div className={classes.keypad}>
        <button onClick={() => changePuzzleData(selButtonIdx, 1)}>1</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 2)}>2</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 3)}>3</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 4)}>4</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 5)}>5</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 6)}>6</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 7)}>7</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 8)}>8</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 9)}>9</button>
        <button onClick={() => changePuzzleData(selButtonIdx, 0)}>
          <img src="svg/eraser.svg" />
        </button>
      </div>
    </div>
  );
};

export default Keypad;
