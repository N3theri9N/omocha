import { useTranslation } from "react-i18next";
import classes from "./MainCareer.module.css";
import layout from "./BodyLayout.module.css";

const MainProjects: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={`${layout.hoc} ${classes.MainCareer}`}>
      <h2 className={classes.title}>{t("MainCareerTitle")}</h2>
      <div>
        <h3>N Tech Service</h3>
      </div>
      <div className={layout.body}>
        <div className={layout.item}>
          <h4>{t("webServicePart")}</h4>
          <span className={layout.label}>2017.07 ~ 2022.06 (5y)</span>
        </div>
        <div className={layout.item}>
          <p>
            <b>{t("Service Domain")} : https://campaign.naver.com</b>
          </p>
          <p>
            <b>{t("Tech Stack")} : </b>
            <span>PHP, JQuery, Spring, MySql, Redis, ReactJS, Nginx</span>
          </p>
          <p>
            <b>{t("Responsibilities")} : </b>
            <span>{t("WS_Role1")}</span>
          </p>
          <p>{t("WS_Role2")}</p>
          <ul
            className={layout.list}
            dangerouslySetInnerHTML={{ __html: t("CarrerPromo") }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainProjects;
