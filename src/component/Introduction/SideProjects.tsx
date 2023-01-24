import { useTranslation } from "react-i18next";
import classes from "./SideProjects.module.css";
import layout from "./BodyLayout.module.css";

const SideProjects: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div id="sideProjects" className={`${classes.SideProjects} ${layout.hoc}`}>
      <h2 className={classes.title}>{t("Team Project")}</h2>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>InterviewPrep</h3>
          <span className={layout.label}>2022.10.22 ~ ongoing</span>
        </div>
        <div className={layout.item}>
          <p>
            <a 
              target="_blank"
              rel="noreferrer"
              href="https://github.com/N3theri9N/front_interviewprep">
            <b>GIT Repository</b>
            </a>
          </p>
          <p>
            {t("IP_Intro")}
          </p>
          <p>{t("participants")} : {t("BackDev")} 3, {t("FrontDev")} 2</p>
          <p>
            <b>{t("Used Stack")}</b> {" : "} JavaScript, React
          </p>
          <p><b>{t("issues")}</b></p>
          <ul className={layout.list} dangerouslySetInnerHTML={{ __html: t("IP_Issue") }} />
        </div>
      </div>
      <h2 className={classes.title}>{t("Private Project")}</h2>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>{t("Daily Sudoku")}</h3>
          <span className={layout.label}>2022.11.24 ~ 2023.01.03</span>
        </div>
        <div className={layout.item}>
          <p>
            <a
              href="/sudoku/daily"
              target="_blank"
              rel="noreferrer"
            >
              <b>{t("revealed")}</b>
            </a>
          </p>
          <p>
            <a
              href="https://github.com/N3theri9N/omocha/tree/feature/sudoku"
              target="_blank"
              rel="noreferrer"
            >
              <b>GIT Repository</b>
            </a>
          </p>
          <p>
            <b>{t("Used Stack")}</b> : NextJS, TypeScript, CSS Modules, firebase,
            react-query
          </p>

          <p><b>{t("issues")}</b></p>

          <ul className={layout.list} dangerouslySetInnerHTML={{ __html: t("DS_Issue") }} />
            
        </div>
      </div>
    </div>
  );
};

export default SideProjects;
