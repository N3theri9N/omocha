import React, { useRef, useState } from "react";
import BusRouteList from "./BusRouteList";
import BusStations from "./BusStations";
import BusInfo from "./BusInfo";
import classes from "./BusStopLayout.module.css";

import { useSetRecoilState } from "recoil";
import { selectedBusState } from "../../store/bus-stop-alarm";

// const globalRouteId: RecoilState<string> = atom({
//   key: "globalRouteId",
//   default: "",
// });

const BusStopLayout: React.FC<{routeId:string}> = ({routeId}) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const setSelectedBus = useSetRecoilState(selectedBusState);

  const [ inputBusNumber, setInputBusNumber] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let busNumber: string = "";
    if (inputRef.current) {
      busNumber = inputRef.current.value;
    }
    setSelectedBus({busName: "", routeId: ""});
    setInputBusNumber(busNumber);
  };

  return (
    <div>
      <BusSubmitForm submitHandler={submitHandler} inputRef={inputRef} />
      <div className={classes.layoutBody}>
        <BusRouteList busNumber={inputBusNumber} />
        <BusInfo routeId={routeId} />
        <BusStations />
      </div>
    </div>
  );
};

const BusSubmitForm: React.FC<{ 
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => {} 
    inputRef: React.RefObject<HTMLInputElement>
  }> = ({ submitHandler, inputRef }) => {
  return (
    <div className={classes.layoutHead}>
      <form className={classes.busForm} onSubmit={submitHandler}>
        <label className={classes.label}>버스번호</label>
        <input className={classes.textInput} ref={inputRef} type="number" />
        <input className={classes.submitButton} type="submit" value="찾기" />
      </form>
    </div>
  );
};

export default BusStopLayout;
