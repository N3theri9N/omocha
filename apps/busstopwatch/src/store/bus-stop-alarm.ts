import { atom } from 'recoil';
import { BusStation } from '../components/model/BusStopDataTypes';

export const selectedBusState = atom({
  key: `selectedState/${Math.random()}`,
  default: {
    routeId: "",
    busName: "",
  },
});

export const alarmBusStation = atom({
  key: `alarmedStations/${Math.random()}`,
  default : new Map<string, BusStation>(),
})