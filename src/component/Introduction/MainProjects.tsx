import { useTranslation } from "react-i18next";
import classes from "./MainProjects.module.css";
import layout from "./BodyLayout.module.css";

const MainProjects: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div id="mainProjects" className={`${classes.MainProjects} ${layout.hoc}`}>
      <h2 className={classes.title}>{t("MainProjectsTitle")}</h2>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>{t("NSLP")}</h3>
          <span className={layout.label}>2021.12 ~ 2022.06</span>
        </div>
        <div className={layout.item}>
          <p>
            {t("participants")} : {t("Marketer")} 1, {t("Web Designer")} 1, {t("Event Developer")} 2
          </p>
          <p>{t("Used Stack")} : ReactJS, MySQL, ElasticSearch</p>
          <p><b>{t("role")}</b></p>
          <ul
            className={layout.list}
            dangerouslySetInnerHTML={{ __html: t("NSLP_ROLE") }}
          ></ul>
          <b>{t("NSLP_CONT")}</b>
        </div>
      </div>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>{t("NMP")}</h3>
          <span className={layout.label}>2020.08 ~ 2021.02</span>
        </div>
        <div className={layout.item}>
          <p>
            {t("participants")} : {t("Event Developer")} 1, {t("Marketer")} 2, {t("Web Designer")} 1, {t("M Part Developer")} 1
          </p>
          <p>{t("Used Stack")} : PHP, Redis, MySQL, crontab</p>
          <p><b>{t("role")}</b></p>
          <ul className={layout.list} dangerouslySetInnerHTML={{ __html: t("NMP_ROLE") }} />
          <p>
            <b>{t("NMP_CONT")}</b>
          </p>
        </div>
      </div>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>{t("PIG")}</h3>
          <span className={layout.label}>2020.09 ~ 2022.06</span>
        </div>
        <div className={layout.item}>
          <p>
            <b>
              URL{" : "}
              <a href="https://campaign.naver.com/insurance/" target="_blank" rel="noreferrer">
                https://campaign.naver.com/insurance/
              </a>
            </b>
          </p>
          <p>
            {t("participants")} : {t("Event Developer")} 1, {t("Marketer")} 1, {t("Web Designer")} 1
          </p>
          <p>
            {t("Used Stack")} : JavaScript, PHP, Redis, ReactJS, Spring, MySQL
          </p>
          <p><b>{t("role")}</b></p>
          <ul className={layout.list}  dangerouslySetInnerHTML={{ __html: t("PIG_ROLE") }}  />
          <p>
            <b>{t("PIG_CONT")}</b>
          </p>
        </div>
      </div>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>V Live Popup</h3>
          <span className={layout.label}>2017.07 ~ 2021.12</span>
        </div>
        <div className={layout.item}>
          <p>
            {t("participants")} : {t("Event Developer")} 1, {t("Marketer")} 1, {t("Web Designer")} 1
          </p>
          <p>{t("Used Stack")} : JavaScript, PHP, ReactJS, Nginx.</p>
          <p><b>{t("role")}</b></p>
          <ul className={layout.list} dangerouslySetInnerHTML={{ __html: t("VlP_ROLE") }} />
          <p>
            <b>{t("VlP_CONT")}</b>
          </p>
        </div>
      </div>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>{t("NPP")}</h3>
          <span className={layout.label}>2017.07 ~ 2022.06</span>
        </div>
        <div className={layout.item}>
          <p>
            {t("participants")} : {t("Event Developer")} 1, {t("Marketer")} 1, {t("Web Designer")} 1
          </p>
          <p>
            {t("Used Stack")} : JavaScript, JQuery, PHP, MySQL, ReactJS, Spring
          </p>
          <p><b>{t("role")}</b></p>
          <ul className={layout.list} dangerouslySetInnerHTML={{ __html: t("NPP_ROLE") }} />
        </div>
      </div>
    </div>
  );
};

export default MainProjects;
