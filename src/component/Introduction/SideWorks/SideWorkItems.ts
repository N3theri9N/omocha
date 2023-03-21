export interface SideworkItemType {
  title: string;
  period: string;
  gitUrl?: string;
  productionUrl?: string;
  usedStack: string;
  tasks: string[];
  result: string;
}

export const sideworkItems: Array<SideworkItemType> = [
  {
    title: "버스 스톱 워치 ( alpha )",
    period: "2023.02.22 ~ 2023.03.16",
    gitUrl: "https://github.com/N3theri9N/omocha/blob/main/src/BusStopApp.tsx",
    productionUrl: "https://omocha-nine.vercel.app/busstop/",
    usedStack: "NextJS, TypeScript, Recoil, FCM, WPA",
    tasks: [
      "지정한 버스가 원하는 정류장에 도착하기 5분 이내면 알림을 전송하는 프로젝트입니다.",
      "선택된 정류장과 관련 컴포넌트가 여러 가지로, 전역 상태 관리가 필요했습니다. 여기서 상태 데이터 동시성 문제 대응에 수월한 recoil을 선택했습니다.",
      "정류장 선택 후 알림이 실행되기까진 백그라운드로도 실행이 되어야 합니다. 처음에는 서버 스케줄링을 설정하려 했으나, 제어가 어려워 대안을 찾다 PWA 을 적용했습니다.",
      "알림은 카카오톡 메시지 API 와 연동하고자 했으나, 로그인을 해야 하며, 이 기능만으로는 알림이 오지 않았습니다.",
      "FCM SDK 와 웹 워커를 연동하여 알림을 수신합니다.",
      "알림을 전송 기능에 oAuth 토큰이 필요합니다. 로그인을 하지 않아야 하므로 Firebase-admin 라이브러리에 인증 데이터를 첨부하여 추가 인증 절차 없이 알림을 전송하도록 제작되었습니다.",
      "모바일에서는 new Notification 미지원으로 서비스 워커의 showNotification으로 구현하였습니다.",
    ],
    result: "PC는 정상 작동하나, 모바일은 한정된 환경에서만 작동하는 크로스 브라우징 이슈가 있어, 이는 잔여 과제로 남았습니다.",
  },
  {
    title: "데일리 스도쿠",
    period: "2022.11.24 ~ 2023.01.03",
    gitUrl: "https://github.com/N3theri9N/omocha/blob/main/src/SudokuApp.tsx",
    productionUrl: "https://omocha-nine.vercel.app/sudoku/daily/",
    usedStack: "NextJS, TypeScript, react-query, firebase Database",
    tasks: [
      "SSG의 장점을 활용할 수 있도록 NextJS 채택했습니다.", 
      "TypeScript와 React 실습을 목적으로 사용했습니다.",
      "완성 후 기록 제출 기능이 있으며 리더보드 기능을 구현. 이 리더보드는 firebase에 연동했습니다.",
      "리더보드의 주기적 갱신이 가능하도록 react-query 채용했습니다.",
      "숫자 칸을 채울 때마다, 너무 많은 검사를 하지 않도록 기능 최적화합니다. ( 예를 들어 이미 틀렸다고 확인된 버튼은 다시 검사하지 않습니다. )",
      "처음에는, 고정적인 퍼즐 페이지 몇 개 만들기로 했지만 공개 후, 받아 일일 무작위 생성 기능을 피드백 받아 이를 구현하였습니다.",
    ],
    result: "리랜더링과 state 얕은 비교에 대한 이해하였으며 리랜더링 최적화에 대한 숙지, 기능이 정상작동으로 완료되었습니다.",
  }
];

// {
//   title: "",
//   period: "",
//   gitUrl: "",
//   productionUrl: "",
//   usedStack: "",
//   tasks: [],
//   result: "",
// }
