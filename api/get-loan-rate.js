/*
 * http://24.144.81.34:3001/api/get-loan-rate?bnkNm=%ED%95%98%EB%82%98
 *
 */

import log4js from "log4js";
import { tabletojson } from "tabletojson";

const logger = log4js.getLogger("app");

export default async function getLoanRate(req, res) {

  logger.info("getLoanRate() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let resData = await main(req.query.bnkNm);

  res.json(resData);

  logger.info("getLoanRate() end...");
}

let apiUrl = "https://hf.go.kr/ko/sub02/sub02_01_07_01.do";

async function main(query) {

  logger.info("main() start...");
  logger.info("query = " + query);

  let table = "";
  await tabletojson.convertUrl(apiUrl, function (tablesAsJson) {
    table = tablesAsJson[0];
  });

  let table2 = table.filter(function (e) {
    return e?.금융기관?.startsWith(query);
  });

  logger.info("table2 = ");
  logger.info(table2);

  logger.info("main() end...");

  return table2;
}
