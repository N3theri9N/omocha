import Headline from "./HeadlineContents/Headline";
import Intro from "./Intro/Intro";
import classes from "./Layout.module.css";
import MainCareer from "./MainCareer/MainCareer";
import SideWorks from "./SideWorks/SideWorks";
import EducateServices from "./EducateServices/EducateServices";

const Layout = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <Headline />
      <Intro />
      <MainCareer />
      <SideWorks />
      <EducateServices />
    </div>
  );
};

export default Layout;
