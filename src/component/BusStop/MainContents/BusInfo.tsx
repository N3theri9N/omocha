import classes from "./BusInfo.module.css";
import { useState, useEffect } from "react";
import { BusRouteInfo, BusAPIPrefix } from "../model/BusStopDataTypes";

import { useRecoilState } from "recoil";
import { selectedBusState } from "../../../store/bus-stop-alarm";
import xmlToJson from "../../../util/xmlToJson";

const BusInfo = (): JSX.Element => {
  const [busInfo, setBusInfo] = useState<BusRouteInfo>();
  const [selectedBus, setSelectedBus] = useRecoilState(selectedBusState);

  useEffect(() => {
    const fetchBusInfo = async () => {
      // console.log("BUSINFO API IS RUNNING");
      // const promise = await fetch(`/api/busstop/busInfo/${routeId}`);
      // const busRoute = await promise.json();

      const promise = await fetch(`${BusAPIPrefix}/getBusRouteInfoItem?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedBus.routeId}`);
      const xmlString: string = await promise.text();
      let XmlNodeRoute: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
      const routeData = XmlNodeRoute.response.msgBody.busRouteInfoItem;
      const busRoute = ((BusRouteInfo) => BusRouteInfo)(routeData);

      setSelectedBus({
        routeId: selectedBus.routeId,
        busName: busRoute.routeName,
      });
      setBusInfo(busRoute);
    };
    if (selectedBus.routeId) {
      fetchBusInfo();
    } else {
      setBusInfo(undefined);
    }
  }, [selectedBus.routeId]);

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
