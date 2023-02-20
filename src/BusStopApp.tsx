import BusStopLayout from "./component/BusStop/BusStopLayout";
import {
  RecoilRoot
} from 'recoil';

const BusStopApp: React.FC = () => {
  return (
    <RecoilRoot>
      <BusStopLayout />
    </RecoilRoot>
  );
};

export default BusStopApp;
