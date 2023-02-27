import { atom } from 'recoil';

export const selectedBusState = atom({
  key: `selectedState/${Math.random()}`,
  default: {
    routeId: "",
    busName: "",
  },
})