import React from "react";
import BusSearch from "./BusSearch";
import MainContents from "./MainContents";
import SelectedStations from "./SelectedStations";

const BusStopLayout: React.FC<{routeId:string}> = ({routeId}) => {

  return (
    <div>
      <BusSearch />
      <MainContents routeId={routeId}/>
      <SelectedStations />
    </div>
  );
};


export default BusStopLayout;
