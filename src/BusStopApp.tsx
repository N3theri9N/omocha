import React, { useRef, useState } from "react";
import xmlToJson from "./xmlToJson";

const BusStopApp: React.FC = () => {
  type busRoutes = {
    districtCd: string;
    regionName: string;
    routeId: string;
    routeName: string;
    routeTypeCd: string;
    routeTypeName: string;
  };

  const inputRef = useRef();
  const [routeList, setRouteList] = useState<Array<busRoutes>>([]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const busNumber = inputRef.current.value;
    const promise = await fetch(
      `https://apis.data.go.kr/6410000/busrouteservice/getBusRouteList?serviceKey=${process.env.DATA_GO_KEY}&keyword=${busNumber}`
    );
    const xmlString: string = await promise.text();
    let XmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
    const result: Array<busRoutes> =
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
      <div>
        <ul>
          {routeList.map((route: busRoutes) => {
            return <li key={route.routeId}>{route.routeName} | {route.regionName} | {route.routeTypeName}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default BusStopApp;
