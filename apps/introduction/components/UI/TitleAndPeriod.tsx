import classes from "./TitleAndPeriod.module.css";

type props = {
  title: string;
  period: string;
};

const TitleAndPeriod = ({title, period} : props): JSX.Element => {
  return (
    <div className={classes.item}>
      <h3>{title}</h3>
      <span className={classes.label}>{period}</span>
    </div>
  );
};
export default TitleAndPeriod;
