import { MongoClient } from 'mongodb';
import log4js from 'log4js';

const logger = log4js.getLogger("app");

export default async function getAptTrd(req, res) {

  logger.info("getAptTrd() start...");

  let params = req.query;
  logger.info("params = " + JSON.stringify(params));

  let queryParams = {};
  queryParams.aptNm = {"$regex": ".*" + params.aptNm + ".*"};

  const client = new MongoClient(process.env.MONGODB_URI);

  let resData = {};

  try {

    await client.connect();
    const database = client.db("dbApt");
    const collection = database.collection("cltAptTrd");
    resData = await collection.find(queryParams).limit(10).toArray();
    logger.info(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }

  res.json(resData);

  logger.info("getAptTrd() end...");

}
