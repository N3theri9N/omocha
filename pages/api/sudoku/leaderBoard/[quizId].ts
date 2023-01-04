// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FIREBASE_DOMAIN } from "../../../../src/global_variables";

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
    console.log("POST!");
    const {quizId, record, message, submitDate} = req.body;

    const response = await fetch(
      `${FIREBASE_DOMAIN}/omocha/sudoku/solutions/${quizId}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          record,
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
  }
}
