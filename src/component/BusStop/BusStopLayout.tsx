import React, { useRef, useState } from "react";
import { BusRoutes, BusRouteInfo, BusStation, BusAPIPrefix } from "./model/BusStopDataTypes";
import BusRouteList from "./BusRouteList";
import BusStations from "./BusStations";
import BusInfo from "./BusInfo";
import xmlToJson from "../../util/xmlToJson";
import classes from "./BusStopLayout.module.css";
// import { atom, RecoilState } from "recoil";

// const globalRouteId: RecoilState<string> = atom({
//   key: "globalRouteId",
//   default: "",
// });

const BusStopLayout: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [routeList, setRouteList] = useState<Array<BusRoutes>>([]);
  const [routeInfo, setRouteInfo] = useState<BusRouteInfo | null>(null);
  const [busStations, setBusStations] = useState<Array<BusStation>>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let busNumber: string = "";
    if (inputRef.current) {
      busNumber = inputRef.current.value;
    }
    const promise = await fetch(`${BusAPIPrefix}/getBusRouteList?serviceKey=${process.env.DATA_GO_KEY}&keyword=${busNumber}`);
    const xmlString: string = await promise.text();
    let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
    const result: Array<BusRoutes> = XmlNode.response?.msgBody?.busRouteList.filter((item: BusRoutes) => item.routeName === busNumber) || [];

    setBusStations([]);
    setSelectedRouteId("");
    setRouteInfo(null);
    setRouteList(result);
  };

  return (
    <div>
      <BusSubmitForm submitHandler={submitHandler} inputRef={inputRef} />
      <div className={classes.layoutBody}>
        <BusRouteList setSelectedRouteId={setSelectedRouteId} routeList={routeList} setBusRouteInfoItem={setRouteInfo} setBusStations={setBusStations} />
        <BusInfo routeInfo={routeInfo} />
        <BusStations selectedRouteId={selectedRouteId} busStations={busStations} />
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
