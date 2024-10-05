import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import log4js from 'log4js';

const logger = log4js.getLogger("app");

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

export default async function getAptTrd(req, res) {

  logger.info("getAptTrd() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let query = {};
  query.sggu = req.query.sggu
  query.aptNm = req.query.aptNm;
  if(Number(req.query.area) > 0) {
    query.area = {
      "$gte" : Number(req.query.area),
      "$lt" : Number(req.query.area) + 1.0
    };
  }
  query.cnclDy = '-';

  const options = {
    sort: { ctrtDy: 1 },
    projection: { _id: 0, prc: 1, ctrtDy: 1 },
  };

  logger.info({query, options});

  let resData = [];

  try {

    await client.connect();
    const database = client.db("dbApt");
    const collection = database.collection("colAptTrd");
    resData = await collection.find(query, options).limit(5000).toArray();

  } catch (error) {
    throw error;
  }

  res.json(resData);

  logger.info("getAptTrd() end...");

}
