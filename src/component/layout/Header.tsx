import React from "react";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.headerItem}>MENU</div>
      <div className={classes.headerItem}>OMOCHA</div>
      <div className={classes.headerItem}>face</div>
    </header>
  );
};

export default React.memo(Header);
