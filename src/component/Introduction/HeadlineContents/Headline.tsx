import classes from "./Headline.module.css";
import Image from "next/image";
import HyperText from "../UI/Hypertext";

const Headline = (): JSX.Element => {
  return (
    <div className={classes.headline}>
      <h1>프로필</h1>
      <table>
        <thead>
          <tr>
            <th className={classes.title}>Name</th>
            <td>:</td>
            <td>김도윤</td>
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
              <Image src="/svg/github.svg" alt="home" className={classes.icon} width={20} height={20} />
              GitHub
            </th>
            <td>:</td>
            <td>
              <HyperText href="https://github.com/N3theri9N" />
            </td>
          </tr>
          <tr>
            <th className={classes.title}>
              <Image src="/svg/notion.svg" alt="home" className={classes.icon} width={20} height={20} />
              Notion
            </th>
            <td>:</td>
            <td>
              <HyperText href="https://nnea5215.notion.site/" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Headline;
