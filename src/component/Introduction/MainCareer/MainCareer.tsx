import RoundedSquare from "../UI/RoundedSquare";
import TitleAndPeriod from "../UI/TitleAndPeriod";
import DiagramImage from "./DiagramImage/DiagramImage";
import classes from "./MainCareer.module.css";
import Projects from "./Projects/Projects";

const MainCareer = (): JSX.Element => {

  const themeColor: string = "purple";
  
  return (
    <RoundedSquare title="주요 경력" styleColor={themeColor}>
      <div>
        <h2>N Tech Service</h2>
      </div>
      <div className={classes.body}>
        <TitleAndPeriod title="웹 서비스 개발실" period="2017.07 ~ 2022.06 (5y)" />
        <div className={classes.item}>
          <ul>
            <li>간편결제 홍보를 위한 프로모션 프로젝트들을 담당하였습니다.</li>
            <li>
              크게 정적인 프로모션 혹은 유저 참여 데이터를 기록하는 기능이 있는 B2C 이벤트 프로젝트. 여기서 기록된 데이터를 열람하거나 이벤트 프로젝트를 관리하는 B2B 어드민 프로젝트 2가지 형태의
              레포지토리를 운영하였습니다.
            </li>
            <li>주로 마크업 디자인 산출물을 받은 이후, 스크립트 적용, 기능 구현과 배포까지 담당하였습니다. 그 외엔 서버 환경 세팅, DB 등등 다양한 유형을 다루었습니다.</li>
          </ul>
          <b>프로젝트 다이어그램</b>
          <DiagramImage />
          <div className={classes.bluePrint}>
            <h4>프로모션 레포지토리 ( B2C )</h4>
            <ul>
              <li>
                <b>환경 : PHP7, HTML, VanillaJS, MySQL ( mysql_cli ), Nginx</b>
              </li>
              <li>사용자에게 공개가 되는 페이지로 여러 개의 단기적으로 여닫는 프로젝트들로 구성되어 있습니다. </li>
              <li>다양한 유형의 프로모션 페이지를 마케터와 협업. 페이지 제작 및 모니터링을 진행합니다.</li>
              <li>og 메타태그 설정하여 운영 환경에 원하는 형식으로 공개.</li>
              <li>사용자의 참여 내역을 DB에 저장하는 기능이 기본 베이스로, 프로젝트 스펙에 따라 타 부서 API 연동, 이미지 Lazy Loading 등등을 적용하여 제작합니다.</li>
              <li>그 외 MySQL, Redis 스토리지, CDN 캐싱, ApacheLucene 로그 수집, ElasticSearch, Linux Crontab, Nginx 내부 설정 등등의 이슈를 다루었습니다.</li>
            </ul>
          </div>
          <div className={classes.redPrint}>
            <h4>어드민 레포지토리 ( B2B )</h4>
            <ul>
              <li>
                <b>환경 : Spring, JSP → ReactJS( 16.8 ), MySQL ( MyBatis ), Webpack</b>
              </li>
              <li>마케터와 개발자에게만 공개된 프로젝트로, 사용자 참여 내역 열람, 이벤트 관련 대시보드 제공</li>
              <li>위의 B2C 페이지의 실제 데이터들을 관리하는 폼, 프로젝트 템플릿 폼을 제공하여 운영 환경에 반영할 수 있는 여러 기능이 들어있습니다.</li>
              <li>og 메타태그 설정하여 운영 환경에 원하는 형식으로 공개.</li>
              <li>로그인 중인 사원 정보의 개인화에 용이하도록 상태 값 저장 환경은 ContextAPI를 사용하다, 코드가 간소해지도록 Recoil로 변경하였습니다.</li>
            </ul>
          </div>
        </div>
      </div>
      <Projects styleColor={themeColor} />
    </RoundedSquare>
  );
};

export default MainCareer;
