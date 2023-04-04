export interface BusRoutes {
  districtCd: string;
  regionName: string;
  routeId: string;
  routeName: string;
  routeTypeCd: string;
  routeTypeName: string;
};

export interface BusRouteInfo {
  downFirstTime: string;
  downLastTime: string;
  routeName: string;
  startStationName: string;
  endStationName: string;
  upFirstTime: string;
  upLastTime: string;
}

export interface BusStation {
  stationId: string;
  stationName: string;
  stationSeq: string;
  turnYn: string;
  routeName?: string;
}

export interface BusLocation {
  plateNo: string;
  stationId: string;
  stationSeq: string;
  // remainSeatCnt: string;
}

export const BusAPIPrefix: string = "https://apis.data.go.kr/6410000/busrouteservice";