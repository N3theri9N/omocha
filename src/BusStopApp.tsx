import BusStopLayout from "./component/BusStop/BusStopLayout";
import { RecoilRoot } from "recoil";

import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";

// TODO : 환경변수로 변경.
const firebaseApp: FirebaseApp = initializeApp(JSON.parse(process.env.FIREBASE_APP_OBJ || '{}'));

function BusStopApp ({ routeId = "" }): JSX.Element {

  const [deviceToken, setDeviceToken] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const messaging = getMessaging(firebaseApp);
      getToken(messaging, { vapidKey: process.env.BUSSTOP_VAPID_KEY })
        .then((currentToken) => {
          if (currentToken) {
            setDeviceToken(currentToken);
          } else {
            console.log("NO TOKEN AVAILABLE");
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
      <BusStopLayout routeId={routeId} deviceToken={deviceToken} />
    </RecoilRoot>
  );
};

export default BusStopApp;
