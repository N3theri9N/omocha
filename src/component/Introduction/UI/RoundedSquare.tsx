
import classes from "./RoundedSquare.module.css";

type props = {
  styleColor: string,
  children: string,
}

const RoundedSquare = ({styleColor, children}: props):JSX.Element => {
  return <div className={classes.roundedSquare} style={{ borderColor: styleColor }}>{children}</div>
}


export default RoundedSquare;