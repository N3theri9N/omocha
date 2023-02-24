import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import BusRouteList from "./BusRouteList";
import BusStations from "./BusStations";
import BusInfo from "./BusInfo";
import classes from "./BusStopLayout.module.css";

// import { atom, RecoilState } from "recoil";

// const globalRouteId: RecoilState<string> = atom({
//   key: "globalRouteId",
//   default: "",
// });

const BusStopLayout: React.FC<{routeId:string}> = ({routeId}) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [ selectedRouteId, setSelectedRouteId] = useState<string>(routeId);
  const [ selectedRouteName, setSelectedRouteName ] = useState<string>("");
  const [ inputBusNumber, setInputBusNumber] = useState<string>("");
  

  const router = useRouter();
  const dynamicRoute = router.asPath;
  useEffect(() => {
    setSelectedRouteId(routeId)
  }, [dynamicRoute])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedRouteId("");
    let busNumber: string = "";
    if (inputRef.current) {
      busNumber = inputRef.current.value;
    }
    setInputBusNumber(busNumber);
  };

  return (
    <div>
      <BusSubmitForm submitHandler={submitHandler} inputRef={inputRef} />
      <div className={classes.layoutBody}>
        <BusRouteList setSelectedRouteId={setSelectedRouteId} busNumber={inputBusNumber} />
        <BusInfo selectedRouteId={selectedRouteId} setSelectedRouteName={setSelectedRouteName} />
        <BusStations selectedRouteId={selectedRouteId} selectedRouteName={selectedRouteName} />
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
