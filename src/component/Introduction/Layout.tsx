import classes from "./Layout.module.css";
import RoundedSquare from "./UI/RoundedSquare";

const Layout = (): JSX.Element => {
  return <div className={classes.container}>
    <RoundedSquare styleColor="red">ABC</RoundedSquare>
  </div>
};

export default Layout;
