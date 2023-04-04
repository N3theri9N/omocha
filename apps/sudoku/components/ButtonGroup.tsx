import classes from "./ButtonGroup.module.css";
import React, { useState } from "react";
import { secondToTime } from "./secondToTime";
import crypto from 'crypto-js';
// import { useRouter } from "next/router";

const ButtonGroup: React.FC<{ record: number; questionId: string }> = ({
  record,
  questionId,
}) => {
  const [message, setMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [copyLabelVisible, setCopyLabelVisible] = useState<boolean>(false);
  const [submitClicked, setSubmitClicked] = useState<boolean>(false);
  // const router = useRouter();
  const cryptoKey: string = process.env.CRYPTO_KEY || "";
  
  const submitHandler = () => {
    setIsVisible(false);
    const inputValue: string = message;
    const timestamp: number = Date.now();
    const cryptedRecord = crypto.AES.encrypt(""+record, cryptoKey).toString();
    fetch(`/api/leaderBoard/${questionId}.json`, {
      method: "POST",
      body: JSON.stringify({
        quizId: questionId,
        record: cryptedRecord,
        message: inputValue,
        submitDate: timestamp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    const newText = e.currentTarget.value.slice(0, 20);
    setMessage(newText);
  };

  const copyHandler = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
    setCopyLabelVisible(true);
    setTimeout(() => {
      setCopyLabelVisible(false);
    }, 3900);
  };

  const closeHandler = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={classes.modalBack}>
          <div className={classes.modal}>
            <div className={classes.buttonGroup}>
              <h2>WELL DONE!</h2>
              <h3>{secondToTime(record)}</h3>
              <div className={classes.inputGroup}>
                <input
                  className={classes.input}
                  onChange={inputChangeHandler}
                  type="text"
                  placeholder="쓰고싶은 메시지를 작성하세요!"
                  maxLength={20}
                />
                <label className={classes.lengthLabel}>
                  {message.length}/20
                </label>
              </div>
              <button onClick={submitHandler}>제출하기</button>
              <button onClick={copyHandler}>url 복사</button>
              <button onClick={closeHandler}>닫기</button>
              {copyLabelVisible && (
                <div className={classes.copyLabel}>복사되었습니다!</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ButtonGroup);
