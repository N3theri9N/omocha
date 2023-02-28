import classes from "./BusSearch.module.css";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { selectedBusState } from "../../store/bus-stop-alarm";
import BusRouteList from "./BusRouteList";

const BusSearch: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setSelectedBus = useSetRecoilState(selectedBusState);
  const [inputBusNumber, setInputBusNumber] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let busNumber: string = "";
    if (inputRef.current) {
      busNumber = inputRef.current.value;
      inputRef.current.value = "";
    }
    if (busNumber) {
      // setSelectedBus({ busName: "", routeId: "" });
      setInputBusNumber(busNumber);
    }
  };

  return (
    <div className={classes.layoutHead}>
      <div className={classes.busFormDiv}>
        <form className={classes.busForm} onSubmit={submitHandler}>
          <label className={classes.label}>버스번호</label>
          <input className={classes.textInput} ref={inputRef} type="text" />
          <input className={classes.submitButton} type="submit" value="찾기" />
        </form>
      </div>
      <BusRouteList busNumber={inputBusNumber} />
    </div>
  );
};

// const BusSubmitForm: React.FC<{
//   submitHandler: (e: React.FormEvent<HTMLFormElement>) => {};
//   inputRef: React.RefObject<HTMLInputElement>;
// }> = ({ submitHandler, inputRef }) => {
//   return (
//     <div className={classes.busFormDiv}>
//       <form className={classes.busForm} onSubmit={submitHandler}>
//         <label className={classes.label}>버스번호</label>
//         <input className={classes.textInput} ref={inputRef} type="text" />
//         <input className={classes.submitButton} type="submit" value="찾기" />
//       </form>
//     </div>
//   );
// };

export default BusSearch;
