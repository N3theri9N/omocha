import classes from "./Header.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState } from "react";

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  // const [language, setLanguage] = useState<String>("ko-KR");
  const [languageIsVisible, setLanguageIsVisible] = useState<Boolean>(false);

  const languageToggleHandler = () => {
    setLanguageIsVisible((prevState) => !prevState);
  };
  const languageChangeHandler = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageIsVisible(false);
  };

  return (
    <>
      <div className={classes.header}>
        <div></div>
        <div></div>
        <div className={classes.buttons} onClick={languageToggleHandler}>
          <Image src="/svg/language.svg" alt="home" className={classes.icon} width={40} height={40} />
        </div>
      </div>
      {languageIsVisible && (
        <div>
          <ul className={classes.languageList}>
            <li
              className={classes.language}
              onClick={() => languageChangeHandler("ko-KR")}
            >
              한국어
            </li>
            <li
              className={classes.language}
              onClick={() => languageChangeHandler("en-US")}
            >
              English
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default Header;
