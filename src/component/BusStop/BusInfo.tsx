import { BusRouteInfo } from "./model/BusStopDataTypes";
import classes from "./BusInfo.module.css";
import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { selectedBusState } from "../../store/bus-stop-alarm";

const BusInfo: React.FC<{routeId: string}> = ({ routeId }) => {
  const [ busInfo, setBusInfo ] = useState<BusRouteInfo|null>(null);
  const setSelectedBus = useSetRecoilState(selectedBusState);

  useEffect(() => {
    const fetchBusInfo = async () => {
      setBusInfo(null);
      console.log("BUSINFO API IS RUNNING");
      const promise = await fetch(`/api/busstop/busInfo/${routeId}`);
      const busRoute = await promise.json();

      // const promise = await fetch(`${BusAPIPrefix}/getBusRouteInfoItem?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedBus.routeId}`);
      // const xmlString: string = await promise.text();
      // let XmlNodeRoute: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
      // const routeData = XmlNodeRoute.response.msgBody.busRouteInfoItem;
      // const busRoute = ((BusRouteInfo) => BusRouteInfo)(routeData);

      setSelectedBus({
        routeId,
        busName: busRoute.routeName,
      });
      setBusInfo(busRoute);
    }
    if (routeId) {
      fetchBusInfo();
    } else {
      setBusInfo(null);
    }
  }, [routeId]);

  return (
    <div className={classes.routeInfo}>
      {busInfo && (
        <table className={classes.routeInfoTable}>
          <caption>{busInfo.routeName} 번 버스</caption>
          <thead>
            <tr>
              <th>기점</th>
              <th>종점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{busInfo.startStationName}</td>
              <td>{busInfo.endStationName}</td>
            </tr>
            <tr>
              <td>
                {busInfo.upFirstTime} - {busInfo.upLastTime}
              </td>
              <td>
                {busInfo.downFirstTime} - {busInfo.downLastTime}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusInfo;
