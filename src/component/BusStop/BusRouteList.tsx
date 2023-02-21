import { BusRoutes, BusAPIPrefix } from "./model/BusStopDataTypes";
import classes from "./BusRouteList.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import xmlToJson from "../../util/xmlToJson";
// import { useRecoilState, RecoilState } from "recoil";

const BusRouteList: React.FC<{
  busNumber: string;
  setSelectedRouteId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ busNumber, setSelectedRouteId }) => {
  const [routeList, setRouteList] = useState<Array<BusRoutes>>([]);
  const router = useRouter();

  useEffect(() => {
    if (busNumber) {
      (async () => {
        const promise = await fetch(`${BusAPIPrefix}/getBusRouteList?serviceKey=${process.env.DATA_GO_KEY}&keyword=${busNumber}`);
        const xmlString: string = await promise.text();
        let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
        const result: Array<BusRoutes> = XmlNode.response?.msgBody?.busRouteList.filter((item: BusRoutes) => item.routeName === busNumber) || [];
        setRouteList(result);
      })();
    }
  }, [busNumber]);

  const routeClickHandler = async (routeId: string) => {
    /* const promiseForBusRoute = await fetch(`${BusAPIPrefix}/getBusRouteInfoItem?serviceKey=${process.env.DATA_GO_KEY}&routeId=${routeId}`)
    const [promiseForBusRoute, promiseForBusStations] = await Promise.all([
      fetch(`${BusAPIPrefix}/getBusRouteInfoItem?serviceKey=${process.env.DATA_GO_KEY}&routeId=${routeId}`),
      fetch(`${BusAPIPrefix}/getBusRouteStationList?serviceKey=${process.env.DATA_GO_KEY}&routeId=${routeId}`),
    ]);
    const xmlStringRoute: string = await promiseForBusRoute.text();
    const xmlStringStations: string = await promiseForBusStations.text();

    let XmlNodeRoute: any = xmlToJson(new DOMParser().parseFromString(xmlStringRoute, "text/xml"));
    let XmlNodeStations: any = xmlToJson(new DOMParser().parseFromString(xmlStringStations, "text/xml"));

    const routeData = XmlNodeRoute.response.msgBody.busRouteInfoItem;
    const stationsData = XmlNodeStations.response.msgBody.busRouteStationList;

    const busRoute = ((BusRouteInfo) => BusRouteInfo)(routeData);
    const busStations = ((BusStation) => BusStation)(stationsData); */

    setSelectedRouteId(routeId);
    setRouteList([]);
    // console.log(router)

    // ToDo : 두 방식중 어떻게 해야하나 고민해볼 것!
    // location.href=`/busstop/${routeId}`
    router.push(`/busstop/${routeId}`);
  };

  return (
    <div className={classes.routeList}>
      {routeList.length > 0 && (
        <table className={classes.routeListTable}>
          <thead>
            <tr>
              <th>번호</th>
              <th>종류</th>
              <th>지역</th>
            </tr>
          </thead>
          <tbody>
            {routeList.map((route: BusRoutes) => {
              return (
                <tr className={classes.routeRow} key={route.routeId} onClick={() => routeClickHandler(route.routeId)}>
                  <th>{route.routeName}</th>
                  <td>{route.routeTypeName}</td>
                  <td>{route.regionName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusRouteList;
