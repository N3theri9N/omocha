import { Dispatch, SetStateAction, useEffect, useState } from "react";
import classes from "./StopWatch.module.css";

const StopWatch: React.FC<{
  isRunning: boolean;
  setRecord: Dispatch<SetStateAction<number>>;
}> = ({ isRunning, setRecord }) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  const divValueAndRest = (main: number, by: number): number[] => {
    const value: number = Math.floor(main / by);
    const rest: number = main % by;
    return [value, rest];
  };

  const fillTwoNumber = (number: number): string => {
    return number.toString().padStart(2, "0");
  };

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setRecord(totalSeconds);
    }

    return () => {
      clearInterval(interval);
      setRecord(totalSeconds);
    };
  }, [isRunning, totalSeconds, setRecord] );

  const [hours, remains] = divValueAndRest(totalSeconds, 3600);
  const [minutes, seconds] = divValueAndRest(remains, 60);

  return (
    <div className={classes.stopWatch}>
      {fillTwoNumber(hours)}:{fillTwoNumber(minutes)}:{fillTwoNumber(seconds)}
    </div>
  );
};

export default StopWatch;
