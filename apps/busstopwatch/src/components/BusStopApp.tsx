import BusStopLayout from "./BusStopLayout";
import { RecoilRoot } from "recoil";

import { FirebaseApp, initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";

// TODO : 환경변수로 변경.
const firebaseApp: FirebaseApp = initializeApp(JSON.parse(process.env.FIREBASE_APP_OBJ || "{}"));

function BusStopApp({ routeId = "" }): JSX.Element {
  const [deviceToken, setDeviceToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" ) {
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
          console.log("error occured ", err);
        });
      onMessage(messaging, async (payload) => {
        const reg = await navigator.serviceWorker.register("/busstop-service-worker.js");

        const title = "BusStopWatch";
        const text = payload?.notification?.body || "BLANK";
        const options = {
          body: text,
          data: {
            createdAt: new Date(Date.now()).toString(),
            message: text,
          },
        };
        reg.showNotification(title, options);
      });
    }
  }, []);

  return (
    <RecoilRoot>
      <BusStopLayout routeId={routeId} deviceToken={deviceToken} />
    </RecoilRoot>
  );
}

export default BusStopApp;
