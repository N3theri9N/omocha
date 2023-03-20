import RoundedSquare from "../UI/RoundedSquare";
import TitleAndPeriod from "../UI/TitleAndPeriod";
import { ESData, ESDataList } from "./EducateServicesData";

const EducateServices = (): JSX.Element => {
  return (
    <RoundedSquare title="학력 및 병역" styleColor="red">
      {ESDataList.map((data: ESData, idx: number) => {
        const isEnd = idx === ESDataList.length - 1;
        const styleBody = isEnd ? {} : { borderBottom: "solid 1px rgba(128, 128, 128, 0.5)" }
        return (
          <div style={ styleBody }>
            <TitleAndPeriod title={data.title} period={data.period} />
            <ul>
              {data.info.map(i => <li>{i}</li>)}
            </ul>
          </div>
        );
      })}
    </RoundedSquare>
  );
};

export default EducateServices;
