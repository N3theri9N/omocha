import { useTranslation } from "react-i18next";
import classes from "./Headline.module.css";
import Image from "next/image";
const Headline: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.headline}>
      <h1>{t("title")}</h1>
      <table>
        <thead>
          <tr>
            <th className={classes.title}>Name</th>
            <td>:</td>
            <td>{t("namae")}</td>
          </tr>
        </thead>
        <tbody className={classes.mainInfo}>
          <tr>
            <th className={classes.title}>E-mail</th>
            <td>:</td>
            <td>nnea5215@gmail.com</td>
          </tr>
          <tr>
            <th className={classes.title}>
              <Image
                src="/svg/github.svg"
                alt="home"
                className={classes.icon}
                width={20}
                height={20}
              />
              GitHub
            </th>
            <td>:</td>
            <td>
              <a
                target="_blank"
                href="https://github.com/N3theri9N"
                className={classes.link}
              >
                https://github.com/N3theri9N
              </a>
            </td>
          </tr>
          <tr>
            <th className={classes.title}>
              <Image
                src="/svg/notion.svg"
                alt="home"
                className={classes.icon}
                width={20}
                height={20}
              />
              Notion
            </th>
            <td>:</td>
            <td>
              <a
                target="_blank"
                href="https://nnea5215.notion.site/"
                className={classes.link}
              >
                https://nnea5215.notion.site/
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Headline;
