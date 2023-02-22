import { useEffect } from "react";
import classes from "./SelectedStations.module.css";
import { BusStation } from "./model/BusStopDataTypes";
import xmlToJson from "../../util/xmlToJson";

const SelectedStations: React.FC<{
  alarmStation: Map<string, BusStation>;
  removeStationHandler: Function;
}> = ({ alarmStation, removeStationHandler }) => {
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (alarmStation.size > 0) {
      interval = setInterval(async () => {
        const routeIds = [...new Set([...alarmStation.keys()].map((i) => i.split("_")[0]))];        
        const promises = routeIds.map(routeId => fetch(`https://apis.data.go.kr/6410000/buslocationservice/getBusLocationList?serviceKey=${process.env.DATA_GO_KEY}&routeId=${routeId}`))

        const promiseResponses = await Promise.all(promises);
        const responseText = [];
        for (let promise of promiseResponses) {
          const xmlString = await promise.text();
          let XmlNode: any = xmlToJson(new DOMParser().parseFromString(xmlString, "text/xml"));
          let result = XmlNode.response.msgBody?.busLocationList || [];
          responseText.push(...result);
        }
        const busLocations = responseText.map((loc) => `${loc.routeId}_${loc.stationSeq}`);
        const reachedStations = busLocations.filter((loc) => alarmStation.has(loc)).map(key => alarmStation.get(key));
        for( let stat of reachedStations){
          if(stat){
            console.log(`${stat.routeName} 번 버스가 ${stat.stationName}에 접근 중입니다.`);
          }
        }
      }, 10000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [alarmStation]);

  const alarmSize = [...alarmStation.keys()].length;
  return (
    <>
    { alarmSize > 0 && 
      <div className={classes.bottomLayout}>
        <div className={classes.bottomLabel}>{`선택된 정류장 : ${alarmStation.size} 개`}</div>}
        <div className={classes.bottomContent}>
          {[...alarmStation.keys()].map((key) => {
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
      </div>  
    }
    </>
  );
};

export default SelectedStations;
