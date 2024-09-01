import { MongoClient } from 'mongodb';
import log4js from 'log4js';

const logger = log4js.getLogger("app");

export default async function getAptInfo(req, res) {

  logger.info("getAptInfo() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let aptNmQr = ".*";
  let aptNm = req.query.aptNm;
  for (let i = 0; i < aptNm.length; i++) {
    aptNmQr += aptNm.charAt(i) + ".*";
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  let resData = [];

  try {

    await client.connect();
    const database = client.db("dbApt");
    const collection = database.collection("cltAptInfo");
    resData = await collection
      .find({sgguAptNm: {$regex: aptNmQr}})
      .sort({prc: -1})
      .limit(1000)
      .toArray();

    logger.info(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }

  res.json(resData);

  logger.info("getAptInfo() end...");

}
