import React from "react";
import BusSearch from "./BusSearchForm/BusSearch";
import MainContents from "./MainContents/MainContents";
import SelectedStations from "./SelectedStations/SelectedStations";

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
