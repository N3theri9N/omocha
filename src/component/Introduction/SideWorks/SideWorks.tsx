import HyperText from "../UI/Hypertext";
import RoundedSquare from "../UI/RoundedSquare";
import TitleAndPeriod from "../UI/TitleAndPeriod";
import { sideworkItems, SideworkItemType } from "./SideWorkItems";
import classes from "./SideWorks.module.css";

const SideWorks = (): JSX.Element => {
  return (
    <RoundedSquare title="사이드 프로젝트" styleColor="green">
      {sideworkItems.map((item: SideworkItemType, idx: number) => {
        const { title, period, productionUrl, gitUrl, usedStack, tasks, result } = item;
        return (
          <div className={classes.body} key={idx}>
            <TitleAndPeriod title={title} period={period} />
            <div>
              {productionUrl && (
                <p>
                  <b>
                    <HyperText innerText="배포 링크" href={productionUrl} />
                  </b>
                </p>
              )}
              {gitUrl && (
                <p>
                  <b>
                    <HyperText innerText="GIT Repository" href={gitUrl} />
                  </b>
                </p>
              )}
              <p>
                <b>개발 환경</b> : {usedStack}
              </p>
              <p>
                <b>주요 과제</b> :
              </p>
              <ul>
                {tasks.map((rol) => (
                  <li>{rol}</li>
                ))}
              </ul>
              <p>
                <b>결과</b> : {result}
              </p>
            </div>
          </div>
        );
      })}
    </RoundedSquare>
  );
};

export default SideWorks;
