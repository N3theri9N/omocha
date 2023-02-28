import { BusStation, BusLocation, BusAPIPrefix } from "./model/BusStopDataTypes";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import SelectedStations from "./SelectedStations";
import xmlToJson from "../../util/xmlToJson";
import classes from "./BusStations.module.css";
import Image from "next/image";
import { alarmBusStation, selectedBusState } from "../../store/bus-stop-alarm";
import { useRecoilValue, useSetRecoilState } from "recoil";

const BusStations: React.FC<{}> = () => {
  const [busLocationList, setBusLocationList] = useState<Array<BusLocation>>([]);
  const [busStationList, setBusStationList] = useState<Array<BusStation>>([]);
  // const [alarmStation, setAlarmStation] = useState<Map<string, BusStation>>(new Map<string, BusStation>());

  const selectedBus = useRecoilValue(selectedBusState);
  const setAlarmStation = useSetRecoilState(alarmBusStation);

  useEffect(() => {
    let interval: NodeJS.Timer;

    const fetchBusStations = async () => {
      console.log("BusStations API RUNNING");

      // 바로 불러오기 : ETag 가 없어 캐싱이 되지 않는다.
      const promise = await fetch(`${BusAPIPrefix}/getBusRouteStationList?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedBus.routeId}`);
      const xmlString: string = await promise.text();
      let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
      let result: Array<BusStation> = XmlNode.response.msgBody.busRouteStationList || [];

      // Next API 로 호출하기 : ETag 로 캐싱이 일어난다.
      // const promise = await fetch(`/api/busstop/route/${selectedBus.routeId}`);
      // const result = await promise.json();
      setBusStationList(result);
    };

    const fetchBusLocation = async () => {
      // console.log("BusLocation API RUNNING");

      const promise = await fetch(`https://apis.data.go.kr/6410000/buslocationservice/getBusLocationList?serviceKey=${process.env.DATA_GO_KEY}&routeId=${selectedBus.routeId}`);
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

    if (selectedBus.routeId) {
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
  }, [selectedBus.routeId]);

  let busLocationObject = new Array(busStationList.length);
  busLocationList.forEach((loc) => {
    const idx: number = parseInt(loc.stationSeq);
    busLocationObject[idx] = loc.plateNo;
  });

  const addStationHandler = (station: BusStation): void => {
    const key = `${selectedBus.routeId}_${station.stationId}`;
    setAlarmStation((prev) => {
      prev.set(key, station);
      return new Map(prev);
    });
  };

  return (
    <>
      <div className={classes.busStations}>
        <table className={classes.busStationsTable}>
          <tbody>
            {busStationList.map((info, idx) => {
              const busLocation = busLocationObject[idx];
              return (
                <Fragment key={info.stationSeq}>
                  <tr className={classes.busStationRow} key={info.stationSeq} onClick={() => addStationHandler({ ...info, routeName: selectedBus.busName })}>
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
    </>
  );
};
export default BusStations;
