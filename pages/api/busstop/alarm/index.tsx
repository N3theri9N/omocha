import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = require("firebase-admin");
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT||"{}");
  // console.log(serviceAccount);
  if (admin.INTERNAL.appStore?.appStore?.size < 1) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  
  switch (req.method) {
    case "POST": {
      // console.log(req.body);
      const { token, message } = JSON.parse(req.body);
      // console.log(token,message);
      const payload = {
        notification: {
          title: "BusStopAlarm",
          body: message,
        },
      };
      await admin.messaging().sendToDevice(token, payload);
    }
  }
}

// const serviceAccount = {
//   type: "service_account",
//   project_id: "react-post-de8f7",
//   private_key_id: "65ddbe89e99b4f2062b33399051371a452adcc0f",
//   private_key:
//     "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDNzY5FSFDEv353\n9IQ7n8jHn8x3138jJWlPcoCVIOAufL3wUmV9q+wBGa9Fcj8TovUGDj8eTGv/ruGP\nXdLPcoc/crhGhIx7nzY43u9Ep97fyjUQO/tlh6zh+XvCI2cDqO74gveEavKxO+oI\nMFp9bcn/BEdHJkv1Ec4PW2+4ehNsjylgBBphfvNtvbcfJ/8E6lWzm/5HzG8Yh8RS\n6EEzn1khsQZP1UE1x+UWdrWzN9GtlM/Zq2v9lnBBII06ie5GRiVICqy4Xhu6Ohu1\nRB9eYHSW1Cc1CUuNqobH30RSZ5VsED4H+K3eBgAIgbFtYLZyNh8AvrIdIpTYvhqj\nmpGflwc9AgMBAAECggEAMaYl7PPxvE1gUssT/ZhiJTqZZs3/t3hmjAqZF6ELRFvG\nrMwL/QH1WRybqprRuciF6RSVyJbyNQg5FU+ytGYyV62y5BxFEevKdnTd70e6Xm3X\nWFfIIenV3NxFrYPB7eGa6SwbT4BHlVdZcelMY1cRtKqREYqdJ33Iou7RqIUW24jM\n58O41T+Fnr7ZGpN9TjPCPiJNMVN+1SCVJEH8LFFyRM5qmMo9uAoaG1N62wrO5J/h\nDKBb7tgvMVC5+WSw2KHyfWHo27L/ih/YG7Aru1awlTeUZh4Hqz43I2Oaq7b5mEIx\n3+3c6wOF7sn+xyUyme5jBuTm0hjjtzL+ySBj/BQHIQKBgQD65u9pcFMUMzqDFonH\nkbh+XwLzn+4dSq40NptZlm6yK8uTzxsQBYbgWHCqW1HtyCAKsygCBvPIrR2PeggM\nyGLGz0GSdE1LmB4ph+TfDAnzCfuwImg/EWLeMMhjCZx3bvia+KdLXSisI8NUy85/\nqVdWJqNm+vKhS9GEJmg6nvUcjQKBgQDR/Amt38zJtqWxtRM4YtDQFhzxTjIDImeX\nwXJCoZN6LZfNG9CRq7P0FQVFsrkc6JvvaS83Oza2KKtt9YIpCbcuASd/KcO0NWMp\naCbbSvz1b6pVOH6lDEqZarQsi/A3L/ZR+j+iCrjlp6c5A9sIUf2OxpB2NjaPhj3c\n2TIHyORhcQKBgQCt+GbVE19nyEWwE3ahfHcSmMqxJpmykc/MwHhjXB2RSTC1Yot/\nRnXJJUmptfxPBc7B3IvHLA7pfK/chl8Cjgd/lsH+zMmzutxfK60Uw4I6lReBf7oM\n0P9e1TB9C3MElVuoCPXnGcdT5NBSAadDeaXnRI9UnniSQsIaAY+P5hxLGQKBgQDL\n271l4XVGi5y3Ns1PG5gPvLgiiMDDDD64NOUBzS2JGwRZ61wEYEbXeyTgMo/GggkJ\nV/uvyjvmgvtTSFsyDi2ZayN2MAzAQmhfxa6bjWShvuQF0lAZWiJ+aPo8mSr/2P9x\nPNtULMaupqIRFy4pGLhqSVnsedtkYXZjlzUcG6uk8QKBgQC+Vf3zrf00r0WRP5vG\nN5QIM1XVjkT/HuyG/lisdZK3Ks1IFc9q0wytqs2RRpYOKojbJ8SBDyYlFD1x3VWz\n1s3ham+jw5euvQXR+UtIYDl+vZC1j034wqB9uOfdC5rLHs1k/hiqwABUnxYUbk7Z\nTUF0ILO2B7H7h0R0LBR7E3LJRQ==\n-----END PRIVATE KEY-----\n",
//   client_email: "firebase-adminsdk-b7d8h@react-post-de8f7.iam.gserviceaccount.com",
//   client_id: "117846183603559121727",
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b7d8h%40react-post-de8f7.iam.gserviceaccount.com",
// };
