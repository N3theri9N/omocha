import type { NextApiRequest, NextApiResponse } from "next";
import { BusAPIPrefix } from "../../../src/components/model/BusStopDataTypes";
import xml2js from "xml2js"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method){
    case "GET" : {
      const { routeId } = req.query;
      const promise = await fetch(`${BusAPIPrefix}/getBusRouteInfoItem?serviceKey=${process.env.DATA_GO_KEY}&routeId=${routeId}`);
      const xmlString: string = await promise.text();

      const parser = new xml2js.Parser({explicitArray: false});
      const data = await parser.parseStringPromise(xmlString);
      return res.status(200).json(data.response.msgBody.busRouteInfoItem);
    } 
    default : {
      return res.status(405);
    }
  }
}
