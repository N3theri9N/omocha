import React from "react";
import BusSearch from "./BusSearchForm/BusSearch";
import MainContents from "./MainContents/MainContents";
import SelectedStations from "./SelectedStations/SelectedStations";

type BusStopLayoutProps = {
  routeId: string;
  deviceToken: string;
}

function BusStopLayout({routeId, deviceToken} : BusStopLayoutProps):JSX.Element {
  return (
    <div>
      <BusSearch />
      <MainContents routeId={routeId}/>
      <SelectedStations deviceToken={deviceToken} />
    </div>
  );
};


export default BusStopLayout;
