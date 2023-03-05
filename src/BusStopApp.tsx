import BusStopLayout from "./component/BusStop/BusStopLayout";
import { RecoilRoot } from "recoil";

import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

// TODO : 환경변수로 변경.
const firebaseApp: FirebaseApp = initializeApp({
  apiKey: "AIzaSyCvg2hs_OBGALO3daVcKdVbJJYnbqm_5XU",
  authDomain: "react-post-de8f7.firebaseapp.com",
  databaseURL: "https://react-post-de8f7-default-rtdb.firebaseio.com",
  projectId: "react-post-de8f7",
  storageBucket: "react-post-de8f7.appspot.com",
  messagingSenderId: "915123736953",
  appId: "1:915123736953:web:748b05a226372a7de71fa8",
});

const BusStopApp: React.FC<{ routeId: string }> = ({ routeId = "" }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const messaging = getMessaging(firebaseApp);
      getToken(messaging, { vapidKey: process.env.BUSSTOP_VAPID_KEY })
        .then((currentToken) => {
          if (currentToken) {
            // console.log(currentToken);
          } else {
            // console.log("NO TOKEN AVAILABLE");
          }
        })
        .catch((err) => {
          console.log("error occured");
        });
      onMessage(messaging, (payload) => {
        // console.log("RECEIVED", payload);
        const title = "BusStopAlarm";
        const options = {
          body: payload?.notification?.body,
        };
        const notification = new Notification(title, options);
      });
    }
  }, []);

  return (
    <RecoilRoot>
      <BusStopLayout routeId={routeId} />
    </RecoilRoot>
  );
};

export default BusStopApp;
