// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FIREBASE_DOMAIN } from "../../../components/global_variables";
import crypto from "crypto-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const response = await fetch(
      `${FIREBASE_DOMAIN}/omocha/sudoku/solutions/${req.query.quizId}.json`
    );
    const data = await response.json();

    res.status(200).json(data);
  } else if (req.method === "POST") {
    const cryptoKey: string = process.env.CRYPTO_KEY || "";
    const { quizId, record, message, submitDate } = req.body;
    try {
      const decryptedRecord: number = +crypto.AES.decrypt(
        record,
        cryptoKey
      ).toString(crypto.enc.Utf8);

      const response = await fetch(
        `${FIREBASE_DOMAIN}/omocha/sudoku/solutions/${quizId}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            record: decryptedRecord,
            message,
            submitDate,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        res.status(500);
      } else {
        res.status(200).send({});
      }
    } catch(e) {
      res.status(500).send("그런 머가리로 뚫릴줄 알았니? ㅋㅋㅋㅋㅋㅋㅋㅋㅋ");
    }
  }
}
