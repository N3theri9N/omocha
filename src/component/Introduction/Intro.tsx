import { useTranslation } from "react-i18next";
import classes from "./Intro.module.css";

const Intro: React.FC = () => {
  const { t } = useTranslation();
  const intro = t("introSection");
  return (
    <div className={classes.intro}>
      <h2 className={classes.title}>{t("introTitle")}</h2>
      <div dangerouslySetInnerHTML={{ __html: intro }}></div>
    </div>
  );
};
export default Intro;
