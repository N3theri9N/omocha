import classes from "./Container.module.css";
import Headline from "./Headline";
import Intro from "./Intro";
import MainCareer from "./MainCareer";
import MainProjects from "./MainProjects";
import SideProjects from "./SideProjects";
import MyStack from "./MyStack";
import History from "./History";
import Study from "./Study";

const Container: React.FC = () => {
  return (
    <div className={classes.container}>
      <Headline />
      <Intro />
      <MainCareer />
      <MainProjects />
      <SideProjects />
      <MyStack />
      <History />
      <Study />
    </div>
  );
};

export default Container;
