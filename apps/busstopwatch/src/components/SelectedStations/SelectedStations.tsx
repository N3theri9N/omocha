import { useEffect, useState } from "react";
import classes from "./SelectedStations.module.css";
import { BusStation } from "../model/BusStopDataTypes";
import xmlToJson from "../../util/xmlToJson";
import { useRecoilState } from "recoil";
import { alarmBusStation } from "../../store/bus-stop-alarm";

type SelectedStationsProps = {
  deviceToken: string;
};

function SelectedStations({ deviceToken }: SelectedStationsProps): JSX.Element {
  // (async function runOneSignal (){
  //   await OneSignal.init({ appId: '3ea19a6b-bb93-4d9d-a3d1-1c30f69051d2', allowLocalhostAsSecureOrigin: true });
  //   OneSignal.showSlidedownPrompt();
  // })();
  //  safari_web_id: "web.onesignal.auto.57017041-c410-4b69-86f6-455278402f0c",

  const [alarmStation, setAlarmStation] = useRecoilState(alarmBusStation);
  const [contentsVisible, setContentsVisible] = useState<boolean>(false);
  const removeStationHandler = (key: string): void => {
    setAlarmStation((prev) => {
      prev.delete(key);
      return new Map(prev);
    });
  };

  const toggleVisible = () => {
    setContentsVisible((prev) => !prev);
  };

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (alarmStation.size > 0) {
      interval = setInterval(async () => {
        const params: string[] = Array.from(alarmStation.keys());
        const promises = params.map((param) => {
          const [routeId, stationId] = param.split("_");
          return fetch(`https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem?serviceKey=${process.env.DATA_GO_KEY}&stationId=${stationId}&routeId=${routeId}`);
        });
        const promiseResponses = await Promise.all(promises);

        promiseResponses.forEach(async (promise, idx) => {
          const xmlString = await promise.text();
          let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
          let result = XmlNode.response.msgBody?.busArrivalItem.predictTime1 || -1;
          if (result <= 5 && result > 0) {
            const key = params[idx];
            const stat: BusStation | undefined = alarmStation.get(key);
            if (stat?.routeName && stat?.stationName) {
              window.navigator.sendBeacon(
                "/api/alarm",
                JSON.stringify({
                  token: deviceToken,
                  message: `${stat.routeName} 번 버스가 ${result} 분 후 ${stat.stationName}에 도착합니다.`,
                })
              );

              removeStationHandler(key);
            }
          }
        });
      }, 30000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [alarmStation]);

  const alarmList: string[] = Array.from(alarmStation.keys());
  const alarmSize: number = alarmList.length;
  return (
    <>
      {alarmSize > 0 && (
        <div className={classes.bottomLayout}>
          <div className={classes.bottomLabel} onClick={toggleVisible}>{`선택된 정류장 : ${alarmStation.size} 개`}</div>
          {contentsVisible && (
            <div className={classes.bottomContent}>
              { alarmList.map((key) => {
                const station: BusStation | undefined = alarmStation.get(key);
                if (station) {
                  return (
                    <div key={key} className={classes.selectedRow}>
                      <div>{station.routeName}</div>
                      <div>{station.stationName}</div>
                      <div>
                        <button onClick={() => removeStationHandler(key)}>X</button>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SelectedStations;
