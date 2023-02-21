import BusStopLayout from "./component/BusStop/BusStopLayout";
import {
  RecoilRoot
} from 'recoil';

const BusStopApp: React.FC <{routeId:string}>= ({routeId = ""}) => {
  return (
    <RecoilRoot>
      <BusStopLayout routeId={routeId} />
    </RecoilRoot>
  );
};

export default BusStopApp;
