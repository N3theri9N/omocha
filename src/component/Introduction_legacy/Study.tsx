import { useTranslation } from "react-i18next";
import Image from "next/image";
import layout from "./BodyLayout.module.css";
import classes from "./Study.module.css";

const Study: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={`${layout.hoc} ${classes.History}`}>
      <h2 className={classes.title}>{t("Study")}</h2>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>Nomad Coder Socket IO Challenge</h3>
          <label className={layout.label}>2022.11.28 ~ 2022.12.04</label>
        </div>
        <ul
          className={layout.list}
          dangerouslySetInnerHTML={{ __html: t("NC_Socket_Issue") }}
        />
        <Image
          alt="tslicense"
          src="/licenses/socketio.png"
          className={classes.license}
          width={260}
          height={139}
        />
      </div>
      <div className={layout.body}>
        <div className={layout.item}>
          <h3>Nomad Coder Typescript Challenge</h3>
          <label className={layout.label}>2022.10.17 ~ 2022.10.31</label>
        </div>
        <ul
          className={layout.list}
          dangerouslySetInnerHTML={{ __html: t("NC_TS_ISSUE") }}
        />
        <Image
          alt="tslicense"
          src="/licenses/ts.png"
          className={classes.license}
          width={260}
          height={139}
        />
      </div>
    </div>
  );
};
export default Study;
