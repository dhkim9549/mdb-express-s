import log4js from 'log4js';
import { db } from '../conn.js';

const logger = log4js.getLogger("app");

export default async function getAptInfo(req, res) {

  logger.info("getAptInfo() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let aptNmQr = ".*";
  let aptNm = req.query.aptNm;
  logger.info({aptNm});
  if(aptNm == undefined) {
    res.json({'msg': 'incorrect param'});
    return;
  }

  for (let i = 0; i < aptNm.length; i++) {
    aptNmQr += aptNm.charAt(i) + ".*";
  }

  let resData = [];

  try {

    const collection = db.collection("colAptInfo");
    resData = await collection
      .find({sgguAptNm: {$regex: aptNmQr}})
      .sort({prc: -1})
      .limit(100)
      .toArray();

    resData = resData.map((x) => {
      x.areas = reduceAreas(x.areas);
      return x;
    });

  } catch (error) {
    throw error;
  }

  res.json(resData);

  logger.info("getAptInfo() end...");

}

function reduceAreas(areas) {
  let areas2 = [];
  areas.forEach((x) => {
    if(!areas2.includes(Math.floor(x))) {
      areas2.push(Math.floor(x));
    }
  });
  return areas2;
}
