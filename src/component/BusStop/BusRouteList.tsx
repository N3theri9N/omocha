import { BusRoutes, BusRouteInfo } from "./model/BusStopDataTypes";
import xmlToJson from "../../xmlToJson";

const BusRouteList: React.FC<{
  routeList: Array<BusRoutes>;
  setBusRouteInfoItem: React.Dispatch<React.SetStateAction<BusRouteInfo | undefined>>;
}> = ({ routeList, setBusRouteInfoItem }) => {
  const routeClickHandler = async (routeId: string) => {
    const promise = await fetch(
      `https://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem?serviceKey=${process.env.DATA_GO_KEY}&routeId=${routeId}`
    );
    const xmlString: string = await promise.text();
    let XmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
    const result: any = xmlToJson(XmlNode)?.response?.msgBody.busRouteInfoItem;
    const busRoute = (({
      downFirstTime,
      downLastTime,
      routeName,
      startStationName,
      endStationName,
      upFirstTime,
      upLastTime,
    }) => ({
      downFirstTime,
      downLastTime,
      routeName,
      startStationName,
      endStationName,
      upFirstTime,
      upLastTime,
    }))(result);
    setBusRouteInfoItem(busRoute);
  };

  return (
    <div>
      <ul>
        {routeList.map((route: BusRoutes) => {
          return (
            <li key={route.routeId}>
              <div onClick={() => routeClickHandler(route.routeId)}>
                {route.routeName} | {route.regionName} | {route.routeTypeName}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BusRouteList;
