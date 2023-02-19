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