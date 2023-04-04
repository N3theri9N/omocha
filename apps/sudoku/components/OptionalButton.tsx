import { useState } from "react";
import classes from "./OptionalButton.module.css";

const OptionalButton: React.FC<{
  savePuzzleData: () => void;
  loadPuzzleData: () => void;
}> = ({ savePuzzleData, loadPuzzleData }) => {
  const [flashIsVisible, setFlashIsVisible] = useState<boolean>(false);
  const [flashMessage, setFlashMessage] = useState<string>("");

  const copyHandler = ():void => {
    savePuzzleData();
    setFlashMessage("저장되었습니다!");
    flashBlink();
  };

  const loadHandler = ():void => {
    loadPuzzleData();
    setFlashMessage("저장한 내용을 불러왔습니다.");
    flashBlink();
  }
  
  const flashBlink = ():void => {
    setFlashIsVisible(true);
    setTimeout(() => {
      setFlashIsVisible(false);
    }, 3900);
  }
  return (
    <>
      <div className={classes.OptionalButton}>
        <button onClick={copyHandler}>임시저장</button>
        <button onClick={loadHandler}>불러오기</button>
      </div>
      {flashIsVisible && (
        <div className={classes.saveLabel}>{flashMessage}</div>
      )}
    </>
  );
};
export default OptionalButton;
