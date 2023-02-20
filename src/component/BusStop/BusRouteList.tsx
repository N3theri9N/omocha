import { BusRoutes, BusRouteInfo, BusStation, BusAPIPrefix } from "./model/BusStopDataTypes";
import xmlToJson from "../../util/xmlToJson";
import classes from "./BusRouteList.module.css";
// import { useRecoilState, RecoilState } from "recoil";

const BusRouteList: React.FC<{
  routeList: Array<BusRoutes>;
  setBusRouteInfoItem: React.Dispatch<React.SetStateAction<BusRouteInfo | null>>;
  setBusStations: React.Dispatch<React.SetStateAction<Array<BusStation>>>;
  setSelectedRouteId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ routeList, setBusRouteInfoItem, setBusStations, setSelectedRouteId }) => {
  const routeClickHandler = async (routeId: string) => {
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
    const busStations = ((BusStation) => BusStation)(stationsData);

    setSelectedRouteId(routeId);
    setBusRouteInfoItem(busRoute);
    setBusStations(busStations);
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
