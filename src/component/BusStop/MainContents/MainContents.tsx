import BusStations from "./BusStations";
import BusInfo from "./BusInfo";
import classes from "./MainContents.module.css";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedBusState } from "../../../store/bus-stop-alarm";

const MainContents: React.FC<{ routeId: string }> = ({ routeId }) => {
  const [selectedBus, setSelectedBus] = useRecoilState(selectedBusState);

  useEffect(() => {
    setSelectedBus({routeId: routeId, busName: ""});
  }, [routeId])
  
  return (
    <>
      {selectedBus.routeId && (
        <div className={classes.layoutBody}>
          <BusInfo />
          <BusStations />
        </div>
      )}
    </>
  );
};

export default MainContents;
