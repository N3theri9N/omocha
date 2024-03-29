import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = require("firebase-admin");
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
  if (admin.INTERNAL.appStore?.appStore?.size < 1) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const iconUrl = "https://omocha-nine.vercel.app/favicons/favicon-32x32.png";
  const link = "https://omocha-nine.vercel.app/busstop/"

  switch (req.method) {
    case "POST": {
      // console.log(req.body);
      const { token, message } = JSON.parse(req.body);
      const payload = {
        notification: {
          title: "BusStopAlarm",
          body: message,
        },
      };
      const response = await admin.messaging().sendToDevice(token, payload);
      res.status(200).send("alarm was sent");
    }
  }
}
