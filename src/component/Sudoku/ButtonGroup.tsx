import classes from "./ButtonGroup.module.css";
import React, { useState } from "react";
import { FIREBASE_DOMAIN } from "../../global_variables";
import { useRouter } from "next/router";

const ButtonGroup: React.FC<{ record: number; questionId: string }> = ({
  record,
  questionId,
}) => {
  const [message, setMessage] = useState<string>("");
  const [copyLabelVisible, setCopyLabelVisible] = useState<boolean>(false);
  const router = useRouter();

  const submitHandler = () => {
    const inputValue:string = message;
    const timestamp: number = Date.now();
    fetch(`/api/sudoku/leaderBoard/${questionId}.json`, {
      method: "POST",
      body: JSON.stringify({
        quizId : questionId,
        record: record,
        message: inputValue,
        submitDate: timestamp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      router.reload();
    });
  };

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>):void => {
    const newText = e.currentTarget.value.slice(0,20);
    setMessage(newText);
  }

  const copyHandler = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    setCopyLabelVisible(true);
    setTimeout(() => {
      setCopyLabelVisible(false);
    }, 3900)
  }

  return (
    <div className={classes.buttonGroup}>
      <div>WELL DONE!</div>
      <div className={classes.inputGroup}>
        <input
          className={classes.input}
          onChange={inputChangeHandler}
          type="text"
          placeholder="쓰고싶은 메시지를 작성하세요!"
          maxLength={20}
        />
        <label className={classes.lengthLabel}>{message.length}/20</label>
      </div>
      <button onClick={submitHandler}>제출하기</button>
      <button onClick={copyHandler}>url 복사</button>
      {copyLabelVisible && <div className={classes.copyLabel}>복사되었습니다!</div>}
    </div>
  );
};

export default React.memo(ButtonGroup);
