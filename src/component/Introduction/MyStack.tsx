import { useTranslation } from "react-i18next";
import Image from "next/image";
import classes from "./MyStack.module.css";
import layout from "./BodyLayout.module.css";

const MyStack = () => {
  const { t } = useTranslation();
  return (
    <div className={`${classes.MainCareer} ${layout.hoc}`}>
      <h2 className={classes.title}>기술 스택</h2>
      <div className={classes.gridContainer}>
        <Image
          src="/logos/html.svg"
          alt="html"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/css.svg"
          alt="css"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/js.svg"
          alt="javascript"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/ts.svg"
          alt="typescript"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/react.svg"
          alt="react"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/nextjs.svg"
          alt="nextjs"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/mysql.svg"
          alt="mysql"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/redis.svg"
          alt="redis"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/firebase.svg"
          alt="firebase"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/nodejs.svg"
          alt="nodejs"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/socket-io.svg"
          alt="socket"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/git.svg"
          alt="git"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/php.svg"
          alt="php"
          className={classes.icon}
          width={120}
          height={120}
        />
        <Image
          src="/logos/spring.svg"
          alt="spring"
          className={classes.icon}
          width={120}
          height={120}
        />
      </div>
    </div>
  );
};

export default MyStack;
