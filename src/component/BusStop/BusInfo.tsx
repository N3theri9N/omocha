import { BusRouteInfo, BusAPIPrefix } from "./model/BusStopDataTypes";
import classes from "./BusInfo.module.css";
import xmlToJson from "../../util/xmlToJson";
import { useState, useEffect } from "react";

const BusInfo: React.FC<{ selectedRouteId: string, setSelectedRouteName:React.Dispatch<React.SetStateAction<string>> }> = ({ selectedRouteId, setSelectedRouteName }) => {
  const [busInfo, setBusInfo] = useState<BusRouteInfo>();

  useEffect(() => {
    if (selectedRouteId) {
      (async () => {
        const promise = await fetch(`${BusAPIPrefix}/getBusRouteInfoItem?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedRouteId}`);
        const xmlString: string = await promise.text();

        let XmlNodeRoute: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
        const routeData = XmlNodeRoute.response.msgBody.busRouteInfoItem;

        const busRoute = ((BusRouteInfo) => BusRouteInfo)(routeData);
        setSelectedRouteName(busRoute.routeName);
        setBusInfo(busRoute);
      })();
    } else {
      setBusInfo(undefined);
    }
  }, [selectedRouteId]);

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
