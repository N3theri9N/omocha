export interface ProjectItemType {
  title: string;
  period: string;
  participants: string;
  usedStack: string;
  role: string[];
  contribute?: string;
}

export const projectItems: Array<ProjectItemType> = [
  {
    title: "네이버 쇼핑 라이브",
    period: "2021.12 ~ 2022.06",
    participants: "마케터 1명, 마크업 1명, 이벤트 개발자 1명",
    usedStack: "ReactJS, JavaScript",
    role: [
      "기간 마다 다른 쇼핑 라이브 상품이 페이지에 전시할 수 있도록 어드민 기능을 제공. 입장한 유저가 어떤 상품을 많이 클릭했는지 지표 기능 지원.",
      "클릭 지표 전송 API 를 구현, sendBeacon 으로 호출.",
      "어드민에 입력 폼을 제공하며, 상품 이름, 이미지 url, 클릭 후 랜딩 주소, 게시 시간, 컨텐츠 슬라이드 여부 등등을 설정하는 기능 제공.",
      "각 input 별로 값 등록 시 유효성 검사, 업로드 유형 설정, 플로 등등을 고려하여 컴포넌트 공통화 구성.",
      "B2C에서는 한 페이지에 이미지가 많이 들어가 성능 이슈에 대한 우려. IntersectionObserver로 LazyLoading 구현하였고 이미지 주소는 cdn 주소 적용.",
      "저장된 클릭 지표를 합산한 내용을 어드민 페이지에서 열람 및 csv, xlsx 형식 다운로드 기능 지원.",
    ],
    contribute: "클릭 지표 기능 구현 및 라이브러리화, 어드민 기능 제공으로 재배포 과정 최소화.",
  },
  {
    title: "어드민 ReactJS 마이그레이션",
    period: "2019.10 ~ 2019.12",
    participants: "이벤트 개발자 4명",
    usedStack: "ReactJS",
    role : [
      "B2B 어드민 프로젝트의 View를 담당하고 있는 JSP의 코드가 보기에 복잡하고 중복 코드가 많으며, ModelAndView과 Data Response 가 공존하여 일관성이 없는 형태로 작동.",
      "Spring 백엔드 RestAPI 적용과 React 컴포넌트 적용으로 역할을 분배했으며 React를 담당하여 RestAPI 담당과 상호 개발과정 진행.",
      "어드민은 마케터가 사용해야 하므로, JSP는 계속 유지. React로 변경하면서 모든 기능이 완료 후 전체 반영.",
      "함수형 컴포넌트와 Hooks 사용을 주로 하는 React 16.8 버전으로 마이그레이션.",
      "어드민에 사용할 전역 상태 값은 로그인한 직원의 사원번호를 저장. 처음은 ContextAPI를 사용했으나, 코드를 간결하게 사용할 수 있도록 Recoil로 변경.",
    ],
    contribute: "코드 간결화, 프론트-백 통신 일관화, 어드민 프로젝트 폼 대응 이슈의 생산성 증대."
  },
  {
    title: "Tech Startup 2019",
    period: "2019.10 ~ 2019.11",
    participants: "이벤트 개발자 1명, 마케티 1명, 마크업 개발자 1명",
    usedStack: "PHP, HTML, JavaScript, ReactJS",
    role : [
      "Tech Startup 오프라인 이벤트가 진행 전/중/후의 페이지 구조가 변경.",
      "디자인 리소스는 강의 구간의 HTML 태그 구조가 모두 동일하여, 컴포넌트 재활용하도록 코드를 반영.",
      "어드민 환경에는 행사 전/중/후의 설정, 강의 영상 url, 강의 내용 HTML 태그 등의 내용을 DB에 저장하도록 폼 제작 및 프론트에 데이터 반영.",
      "특정 강의마다 고유 키값을 설정하여 클릭 시 Modal 창이 열리면서, 강의 영상 iframe 반영, 타이틀 이미지, 강의 요약 내용들이 반영.",
      "강의 키에 대해 Query String 을 적용하여, 진입 시 페이지 모달 화면 출현하도록 반영. 그리고 해당 주소로 SNS 공유할 경우, 유동적인 og 태그 적용.",
    ],
    contribute: "컴포넌트를 재활용하면서 구현하는 스타일로 제작하여 코드 간소화.",
  },
  {
    title: "V Live 팝업 페이지",
    period: "2017.07 ~ 2021.12",
    participants: "이벤트 개발자 1명, 마케터 1명, 마크업 개발자 1명.",
    usedStack: "PHP, HTML, VanillaJS, ReactJS, Nginx.",
    role : [
      "VLive 앱에 접속 시 처음 보이는 팝업 페이지를 V Live 측에 제공. 팝업은 V Live 상품 판매 페이지로 랜딩 하는 버튼으로 구성.",
      "최소 한/영 2개국어, 최대 10개국어를 지원하며, 사용자의 요청 헤더의 Language 값을 기준으로 랜딩 할 언어 페이지가 결정.",
      "Web / Android / iOS 환경별 크로스 브라우징 이슈 대응.  테스트 버전 앱으로 앱스킴 링크, 리다이렉트 기능에 대해 트러블 슈팅 진행.",
      "기능이 단순함에 비해 페이지 대응 수가 많아, 생산성 향상에 대한 고민. 디자인 완성 후 마케터가 직접 페이지를 생성할 수 있도록 어드민에 제작 툴 구현.",
      "VLive 이벤트 이름, 언어를 변수로 받는 스크립트를 프로모션 프로젝트에 생성하고 내용에 따라 외부 에셋을 사용하는 구조로 설계.",
      "어드민에서는 위의 에셋을 배표 및 관리하는 폼 제작 ( git 주소, 권한, 상품 랜딩 주소 등 ), iframe을 통한 미리 보기 기능과 팝업 페이지 주소 리스트 제공 ",
      "그 외 멀티 서버 환경의 동기화, cdn, nginx rewrite 등등의 이슈 대응.",
    ],
    contribute : "툴 제작 후 배포 프로세스 최소화, VLive 팝업 페이지 생산성 증대",
  },
  {
    title: "네이버 페이 프로모션",
    period: "2017.07 ~ 2022.06",
    participants: "이벤트 개발자 1명, 마케터 1명, 마크업 개발자 1명",
    usedStack: "JavaScript, PHP, MySQL, ReactJS",
    role : [
      "대부분의 이벤트 페이지의 기본적인 구조. 정적인 HTML 페이지에서 유저 참여 버튼 클릭시 DB 에 저장하는 기능이 적용된 소규모 프로젝트. 이를 주기적으로 제작.",
      "IE 브라우저의 호환성도 필요하여 ES6 문법, 람다식, Promise 등등을 사용할 수 있도록 babel 과 corejs 적용.",
      "HTML 마크업 리소스로 시작하여, JavaScript 및 PHP 서버 스크립트 적용. 필요에 따라 slick, swiper와 같은 플러그인 적용.",
      "DB 이력을 저장하는 PHP 프록시 서버 스크립트 제작. 이벤트 페이지에선 ajax 이를 비동기 호출하도록 실행.",
      "footer의 SNS 공유 기능, 이벤트 리스트 출력 기능과 관련된 공통 플러그인 유지 및 보수.",
      "이 과정으로 DB에 저장된 데이터를 어드민에서 열람하는 기능 반영. 이벤트 별/날짜 별 기준으로 참여 수 차트 그래프 기능 지원. 참여 내역 xlsx 파일 다운로드 기능 적용.",
    ]
  }
];

// {
//   title: "",
//   period: "",
//   participants: "",
//   usedStack: "",
//   role : []
// },