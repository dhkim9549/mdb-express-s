import { MongoClient } from 'mongodb';
import log4js from 'log4js';

const logger = log4js.getLogger("app");

export default async function getAptTrd(req, res) {

  logger.info("getAptTrd() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let query = {};
  query.aptNm = req.query.aptNm;
  if(Number(req.query.area) > 0) {
    query.area = {
      "$gte" : Number(req.query.area),
      "$lt" : Number(req.query.area) + 1.0
    };
  }

  const options = {
    sort: { ctrtYm: 1, ctrtDy: 1 },
    projection: { _id: 0, prc: 1, ctrtYm: 1 },
  };

  logger.info({query, options});

  const client = new MongoClient(process.env.MONGODB_URI);

  let resData = [];

  try {

    await client.connect();
    const database = client.db("dbApt");
    const collection = database.collection("cltAptTrd");
    resData = await collection.find(query, options).limit(5000).toArray();
    logger.info(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }

  res.json(resData);

  logger.info("getAptTrd() end...");

}
