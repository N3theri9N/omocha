import { BusStation, BusLocation } from "./model/BusStopDataTypes";
import { Fragment, useState, useEffect } from "react";
import xmlToJson from "../../util/xmlToJson";
import classes from "./BusStations.module.css";
import Image from "next/image";
// import { useRecoilValue, RecoilState} from "recoil";

const BusStations: React.FC<{
  busStations: Array<BusStation>;
  selectedRouteId: string;
}> = ({ busStations, selectedRouteId }) => {
  const [busLocationList, setBusLocationList] = useState<Array<BusLocation>>([]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    const fetchBusLocation = async () => {
      const promise = await fetch(`https://apis.data.go.kr/6410000/buslocationservice/getBusLocationList?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedRouteId}`);
      const xmlString: string = await promise.text();
      let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
      let result: Array<BusLocation> | BusLocation = XmlNode.response.msgBody?.busLocationList || [];

      const isBusLocation = (object: any): object is BusLocation => {
        return 'stationId' in object
      }

      if(isBusLocation(result)){
        result = [{
          plateNo : result.plateNo,
          stationId : result.stationId,
          stationSeq : result.stationSeq,
        }]
      }
      setBusLocationList(result);
    };

    if (selectedRouteId) {
      fetchBusLocation();
      interval = setInterval(() => {
        console.log("runfetchBusLocation");
        fetchBusLocation();
      }, 30000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [selectedRouteId]);
  let busLocationObject = new Array(busStations.length);
  console.log("busLocationList", busLocationList)
  busLocationList.forEach((loc) => {
    const idx: number = parseInt(loc.stationSeq);
    busLocationObject[idx] = loc.plateNo;
  });

  return (
    <div className={classes.busStations}>
      <table className={classes.busStationsTable}>
        <tbody>
          {busStations.map((info, idx) => {
            const busLocation = busLocationObject[idx];
            return (
              <Fragment key={info.stationSeq}>
                <tr className={classes.busStationRow} key={info.stationSeq}>
                  <td className={classes.busStationName}>{info.stationName}</td>
                  <td className={classes.busLocation}>{busLocation} </td>
                  <td className={classes.busIcon}>
                    {busLocation && <Image src="/svg/redBus.svg" alt="bus" width={30} height={30} style={{marginTop: 5}} />}
                    <div className={classes.vetricalLine}></div>
                  </td>
                </tr>
                {info.turnYn === "Y" && (
                  <tr key="turningPoint" className={classes.turningPoint}>
                    <td colSpan={3}>회차점</td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default BusStations;
