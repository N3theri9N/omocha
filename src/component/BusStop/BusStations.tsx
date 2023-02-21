import { BusStation, BusLocation, BusAPIPrefix } from "./model/BusStopDataTypes";
import React, { Fragment, useState, useEffect } from "react";
import xmlToJson from "../../util/xmlToJson";
import classes from "./BusStations.module.css";
import Image from "next/image";
// import { useRecoilValue, RecoilState} from "recoil";

const BusStations: React.FC<{
  selectedRouteId: string;
}> = ({ selectedRouteId }) => {
  const [busLocationList, setBusLocationList] = useState<Array<BusLocation>>([]);
  const [busStationList, setBusStationList] = useState<Array<BusStation>>([]);
  const [alarmStation, setAlarmStation] = useState<Map<string, BusStation>>(new Map<string, BusStation>());

  useEffect(() => {
    let interval: NodeJS.Timer;

    const fetchBusStations = async () => {
      const promise = await fetch(`${BusAPIPrefix}/getBusRouteStationList?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedRouteId}`);
      const xmlString: string = await promise.text();
      let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
      let result: Array<BusStation> = XmlNode.response.msgBody.busRouteStationList || [];
      setBusStationList(result);
    };

    const fetchBusLocation = async () => {
      const promise = await fetch(`https://apis.data.go.kr/6410000/buslocationservice/getBusLocationList?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedRouteId}`);
      const xmlString: string = await promise.text();
      let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
      let result: Array<BusLocation> | BusLocation = XmlNode.response.msgBody?.busLocationList || [];

      const isBusLocation = (object: any): object is BusLocation => {
        return "stationId" in object;
      };

      if (isBusLocation(result)) {
        result = [
          {
            plateNo: result.plateNo,
            stationId: result.stationId,
            stationSeq: result.stationSeq,
          },
        ];
      }
      setBusLocationList(result);
    };

    if (selectedRouteId) {
      fetchBusStations();
      fetchBusLocation();
      interval = setInterval(() => {
        fetchBusLocation();
      }, 30000);
    } else {
      setBusStationList([]);
      setBusLocationList([]);
    }

    return () => {
      clearInterval(interval);
    };
  }, [selectedRouteId]);
  let busLocationObject = new Array(busStationList.length);
  busLocationList.forEach((loc) => {
    const idx: number = parseInt(loc.stationSeq);
    busLocationObject[idx] = loc.plateNo;
  });

  const addStationHandler = (station: BusStation): void => {
    const key = `${selectedRouteId}_${station.stationSeq}`;
    setAlarmStation((prev) => {
      console.log(prev);
      return prev.set(key, station);
    });
  };
  const removeStationHandler = (key: string):void => {
    setAlarmStation((prev) => {
      prev.delete(key)
      return prev;
    })
  }

  return (
    <>
      <div className={classes.busStations}>
        <table className={classes.busStationsTable}>
          <tbody>
            {busStationList.map((info, idx) => {
              const busLocation = busLocationObject[idx];
              return (
                <Fragment key={info.stationSeq}>
                  <tr className={classes.busStationRow} key={info.stationSeq} onClick={() => addStationHandler(info)}>
                    <td className={classes.busStationName}>{info.stationName}</td>
                    <td className={classes.busLocation}>{busLocation} </td>
                    <td className={classes.busIcon}>
                      {busLocation && <Image src="/svg/redBus.svg" alt="bus" width={30} height={30} style={{ marginTop: 5 }} />}
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
      <div className={classes.bottom}>
        {[...alarmStation.keys()].map((key) => {
          const station: BusStation | undefined = alarmStation.get(key);
          if (station) {
            return (
              <div key={key} className={classes.selectedRow}>
                <div>{station.stationName}</div>
                <div><button onClick={() => removeStationHandler(key)}>X</button></div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
export default BusStations;
