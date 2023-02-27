import { BusRoutes, BusAPIPrefix } from "./model/BusStopDataTypes";
import classes from "./BusRouteList.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import xmlToJson from "../../util/xmlToJson";

const BusRouteList: React.FC<{
  busNumber: string;
}> = ({ busNumber }) => {
  const [routeList, setRouteList] = useState<Array<BusRoutes>>([]);
  const router = useRouter();

  useEffect(() => {
    if (busNumber) {
      (async () => {
        setRouteList([]);
        const promise = await fetch(`${BusAPIPrefix}/getBusRouteList?serviceKey=${process.env.DATA_GO_KEY}&keyword=${busNumber}`);
        const xmlString: string = await promise.text();
        let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
        let result: Array<BusRoutes> | BusRoutes = XmlNode.response?.msgBody?.busRouteList || [];

        const isBusRoute = (object: any): object is BusRoutes => {
          return "routeId" in object;
        };

        if (isBusRoute(result)) {
          result = [
            {
              districtCd: result.districtCd,
              regionName: result.regionName,
              routeId: result.routeId,
              routeName: result.routeName,
              routeTypeCd: result.routeTypeCd,
              routeTypeName: result.routeTypeName,
            },
          ];
        }

        setRouteList(result.filter((item: BusRoutes) => item.routeName === busNumber));
      })();
    }
  }, [busNumber]);

  const routeClickHandler = async (routeId: string) => {
    // setSelectedRouteId(routeId);
    // setSelectedBus({
    //   routeId,
    //   busName: busNumber,
    // });
    setRouteList([]);
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
