import { MongoClient } from 'mongodb';
import log4js from 'log4js';

const logger = log4js.getLogger("app");

export default async function postData(req, res) {

  logger.info("postData() start...");

  let body = req.body;
  logger.info("body = " + JSON.stringify(body));

  const client = new MongoClient(process.env.MONGODB_URI);

  let resData = {};

  try {

    await client.connect();
    const database = client.db("dbTest");
    const collection = database.collection("colTest");
    resData = await collection.find(body).limit(10).toArray();
    logger.info(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }

  res.json(resData);

  logger.info("postData() end...");

}
