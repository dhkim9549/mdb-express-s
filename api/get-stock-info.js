/*
 * http://24.144.81.34:3001/api/get-stock-info?stockNm=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90
 *
 */

import log4js from "log4js";
import { tabletojson } from "tabletojson";

const logger = log4js.getLogger("app");

export default async function getStockInfo(req, res) {

  logger.info("getStockInfo() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  let resData = await main(req.query.stockNm);

  res.json(resData);

  logger.info("getStockInfo() end...");
}

let apiUrl = "https://api.scraperapi.com/?api_key=a6feef9544ee61c2d5b078836ca638f4&url=https%3A%2F%2Ffinance.naver.com%2Fsise%2Fsise_market_sum.naver";

async function main(query) {

  logger.info("main() start...");
  logger.info("query = " + query);

  let table = "";
  await tabletojson.convertUrl(apiUrl, function (tablesAsJson) {
    table = tablesAsJson[1];
  });

  let table2 = table.filter(function (e) {
    return e?.종목명?.startsWith(query);
  });

  logger.info("table2 = ");
  logger.info(table2);
  logger.info("main() end...");

  return table2;
}
