import log4js from "log4js";
import { db } from "../conn.js";

const logger = log4js.getLogger("app");

export default async function getAptLog(req, res) {
  logger.info("getAptLog() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let query = {};

  const options = {
    sort: { _fstRegTs: -1 },
  };

  logger.info({ query, options });

  let resData = [];

  try {
    const collection = db.collection("colAptLog");
    resData = await collection.find(query, options).limit(5000).toArray();
  } catch (error) {
    throw error;
  }

  res.json(resData);

  logger.info("getAptLog() end...");
}
