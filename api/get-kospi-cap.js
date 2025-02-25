import log4js from "log4js";
import { dbFF } from "../conn.js";

const logger = log4js.getLogger("app");

export default async function getKospiCap(req, res) {
  logger.info("getKospiCap() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let query = {};

  const options = {
    sort: { N: 1 },
    projection: { _id: 0 },
  };

  logger.info({ query, options });

  let resData = [];

  try {
    const collection = dbFF.collection("colKospi");
    resData = await collection.find(query, options).limit(5000).toArray();
  } catch (error) {
    throw error;
  }

  res.json(resData);

  logger.info("getKospiCap() end...");
}
