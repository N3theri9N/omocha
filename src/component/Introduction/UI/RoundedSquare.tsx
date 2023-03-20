import { PropsWithChildren } from "react";
import classes from "./RoundedSquare.module.css";

interface props extends PropsWithChildren {
  title: string;
  styleColor: string;
}

const RoundedSquare = ({ styleColor, children, title }: props): JSX.Element => {
  return (
    <div className={classes.roundedSquare} style={{ borderColor: styleColor }}>
      <h2 className={classes.title} style={{ borderColor: styleColor }}>
        {title}
      </h2>
      <div className={classes.titleBackground} style={{ backgroundColor: styleColor }}></div>
      <div className={classes.body}>
        {children}
      </div>
    </div>
  );
};

export default RoundedSquare;
