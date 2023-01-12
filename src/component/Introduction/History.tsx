import { useTranslation } from "react-i18next";
import layout from "./BodyLayout.module.css";
import classes from "./History.module.css";

const History: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={`${layout.hoc} ${classes.History}`}>
      <h2 className={classes.title}>{t("History")}</h2>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>{t("UNIVERSITY")}</h3>
          <label className={layout.label}>2010.03 ~ 2017.08</label>
        </div>
        <div>
          <ul className={layout.list}>
            <li>{t("CE")} : 3.49 / <b>4.5</b></li>
            <li>{t("Bachelor")}</li>
          </ul>
        </div>
      </div>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>{t("Army")}</h3>
          <label className={layout.label}>2011.03 ~ 2012.12</label>
        </div>
        <div>
          <ul className={layout.list}>
            <li>{t("Sergent")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default History;
