import React from "react";
import ReactDOM from "react-dom";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { observer } from "mobx-react";

// Model the application state.
class Timer {
  secondsPassed;

  constructor() {
    this.secondsPassed = 0;
    makeAutoObservable(this, {
      secondsPassed: observable,
      increase: action,
      reset: action,
    });
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

const myTimer = new Timer();

interface timerInterface {
  timer : Timer
}

// Build a "user interface" that uses the observable state.
const TimerView = observer(({ timer } : timerInterface) => (
  <button onClick={() => timer.reset()}>
    Seconds passed: {timer.secondsPassed}
  </button>

));

// Update the 'Seconds passed: X' text every second.
setInterval(() => {
  myTimer.increase();
}, 1000);


const mobxTest: React.FC = () => {
  console.log("rerendered");
  return <TimerView timer={myTimer} />;
  
}

export default mobxTest;