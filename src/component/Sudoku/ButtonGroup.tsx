import classes from "./ButtonGroup.module.css";
import React, { useRef } from "react";
import { FIREBASE_DOMAIN } from "../../global_variables";
import { useRouter } from "next/router";

const ButtonGroup: React.FC<{ record: number; questionId: string }> = ({
  record,
  questionId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const submitHandler = () => {
    const inputValue: undefined | string = inputRef?.current?.value;
    const timestamp: number = Date.now();
    fetch(`${FIREBASE_DOMAIN}/omocha/sudoku/solutions/${questionId}.json`, {
      method: "POST",
      body: JSON.stringify({
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

  return (
    <div className={classes.buttonGroup}>
      <div>WELL DONE!</div>
      <div className={classes.input}>
        <input
          ref={inputRef}
          type="text"
          placeholder="쓰고싶은 메시지를 작성하세요!"
        />
      </div>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default React.memo(ButtonGroup);
