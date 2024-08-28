import { MongoClient } from 'mongodb';
import log4js from 'log4js';

const logger = log4js.getLogger("app");

export default async function getAptNm(req, res) {

  logger.info("getAptNm() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let aptNmQr = ".*";
  let aptNm = req.query.aptNm;
  for (let i = 0; i < aptNm.length; i++) {
    aptNmQr += aptNm.charAt(i) + ".*";
  }

  let pipeline = [
    {
      $match: {keyStr: {$regex: aptNmQr}}
    },
    {
      $group: { _id: "$keyStr", prc: { $sum: "$prc" } }
    },
    {
      $sort:{ prc : -1 }
    }
  ];

  logger.info(JSON.stringify({pipeline}, null, 2));

  const client = new MongoClient(process.env.MONGODB_URI);

  let resData = [];

  try {

    await client.connect();
    const database = client.db("dbApt");
    const collection = database.collection("cltAptSum");
    resData = await collection.aggregate(pipeline).limit(5000).toArray();
    logger.info(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }

  res.json(resData);

  logger.info("getAptNm() end...");

}
