import { BusRouteInfo } from "./model/BusStopDataTypes";
import classes from "./BusInfo.module.css";

const BusInfo: React.FC<{ routeInfo: BusRouteInfo | null }> = ({ routeInfo }) => {
  return (
    <div className={classes.routeInfo}>
      {routeInfo && (
        <table className={classes.routeInfoTable}>
          <caption>버스 번호 : {routeInfo.routeName}</caption>
          <thead>
            <tr>
              <th>기점</th>
              <th>종점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{routeInfo.startStationName}</td>
              <td>{routeInfo.endStationName}</td>
            </tr>
            <tr>
              <td>{routeInfo.upFirstTime} - {routeInfo.upLastTime}</td>
              <td>{routeInfo.downFirstTime} - {routeInfo.downLastTime}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusInfo;
