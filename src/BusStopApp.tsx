import React, { useRef, useState } from "react";
import {
  BusRoutes,
  BusRouteInfo,
} from "./component/BusStop/model/BusStopDataTypes";
import BusRouteList from "./component/BusStop/BusRouteList";
import xmlToJson from "./xmlToJson";

const BusStopApp: React.FC = () => {
  const inputRef = useRef();
  const [routeList, setRouteList] = useState<Array<BusRoutes>>([]);
  const [routeInfo, setRouteInfo] = useState<BusRouteInfo>();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const busNumber = inputRef.current.value;
    const promise = await fetch(
      `https://apis.data.go.kr/6410000/busrouteservice/getBusRouteList?serviceKey=${process.env.DATA_GO_KEY}&keyword=${busNumber}`
    );
    const xmlString: string = await promise.text();
    let XmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
    const result: Array<BusRoutes> =
      xmlToJson(XmlNode)?.response?.msgBody?.busRouteList || [];
    setRouteList(result);
  };

  return (
    <div>
      <h2>버스 스톱 워치</h2>
      <form onSubmit={submitHandler}>
        <label>버스번호를 입력해주세요</label>
        <input ref={inputRef} type="number" />
        <input type="submit" value="찾기" />
      </form>
      <BusRouteList routeList={routeList} setBusRouteInfoItem={setRouteInfo} />
      <div>
        {routeInfo?.routeName && (
          <div>
            버스 번호 : {routeInfo.routeName} <br/>
            기점 정류장 : {routeInfo.startStationName} | 종점 정류장 : {routeInfo.endStationName} <br/>
            기점 출발 시간 : {routeInfo.downFirstTime} | 기점 막차 시간 : {routeInfo.downLastTime} <br/>
            종점 출발 시간 : {routeInfo.upFirstTime} | 종점 막차 시간 : {routeInfo.upLastTime} <br/>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusStopApp;
