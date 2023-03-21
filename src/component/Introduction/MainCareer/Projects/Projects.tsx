import TitleAndPeriod from "../../UI/TitleAndPeriod";
import classes from "./Projects.module.css";
import { projectItems, ProjectItemType } from "./ProjectItems";

type propsType = {
  styleColor: string;
};

const Projects = ({ styleColor }: propsType): JSX.Element => {
  return (
    <div>
      <h3 className={classes.title} style={{ borderColor: styleColor }}>
        담당 프로젝트
      </h3>
      <div className={classes.titleBackground} style={{ backgroundColor: styleColor }} />
      {projectItems.map((item: ProjectItemType, idx: number) => {
        return (
          <div key={idx} className={classes.body}>
            <TitleAndPeriod title={item.title} period={item.period} />
            <div className={classes.item}>
              <p>
                <b>참여 인원</b> : {item.participants}
              </p>
              <p>
                <b>사용 기술</b> : {item.usedStack}
              </p>
              <p>
                <b>역할 및 기여</b> :
              </p>
              <ul>
                {item.role.map((rol, idx) => (
                  <li key={idx}>{rol}</li>
                ))}
              </ul>
              {item?.contribute && (
                <p>
                  <b>성과 : {item.contribute}</b>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Projects;
