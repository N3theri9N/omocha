import { useState, useEffect } from "react";
import classes from "./Navigation.module.css";
import Link from "next/link";

const Navigation : React.FC = () => {
  
  const [active, setActive] = useState<number>(0); 

  type section = {
    id: string,
    text: string
  }
  const items: section[] = [
    { id: "headline" ,text: "헤드라인"}, 
    { id: "intro", text: "자기 소개"},
    { id: "mainCareer", text : "주요 경력"},
    { id: "mainProjects", text : "실무 프로젝트"},
    { id: "sideProjects", text : "사이드 프로젝트"},
    { id: "myStack", text : "기술 스택"},
    { id: "history", text : "학력 및 병역"},
    { id: "study", text : "스터디 활동"},
  ]

  const scrollEvent = (function () {
    let todo: boolean = true;
    let offSet : number[];

    const handleScroll = () => {
      todo = false;
      {
        const newActive = offSet.filter(i => window.scrollY > i).length;
        setActive(newActive);
      }
    };

    let timer: NodeJS.Timer;

    const init = () => {
      window.addEventListener("scroll", () => {
        todo && handleScroll();
      });
      offSet = items.map((section) => document.getElementById(section.id)?.offsetTop || 0)
      
      timer = setInterval(() => {
        todo = true;
      }, 100);
    };

    const clearTimeout = () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };

    return {
      init,
      clearTimeout,
    };
  })();

  useEffect(() => {
    scrollEvent.init();
    return () => {
      scrollEvent.clearTimeout();
    };
  }, []);
  return <div className={classes.navigation}>
    { items.map((val, index) => {
      return (
        <div key={val.id} className={classes.navItem}>
          <Link className={`${index === active && classes.active}`} href={`#${val.id}`}>{val.text}</Link>
        </div>
      )
    })}
  </div>
}

export default Navigation