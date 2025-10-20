/*
 * http://0.0.0.0:3001/api/get-stock-info?stockNm=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90
 *
 */

import dotenv from "dotenv";
import log4js from "log4js";
import { tabletojson } from "tabletojson";

dotenv.config();
const logger = log4js.getLogger("app");

const { KOSPI_API_URL } = process.env;

export default async function getStockInfo(req, res) {
  logger.info("getStockInfo() start...");

  logger.info("req.query = " + JSON.stringify(req.query));

  const resData = await main(req.query.stockNm);

  res.json(resData);

  logger.info("getStockInfo() end...");
}

async function main(query) {
  logger.info("main() start...");
  logger.info("query = " + query);

  let table = "";
  await tabletojson.convertUrl(KOSPI_API_URL, (tablesAsJson) => {
    table = tablesAsJson[1];
  });

  const table2 = table.filter((e) => e?.종목명?.startsWith(query));

  logger.info("table2 = ");
  logger.info(table2);
  logger.info("main() end...");

  return table2;
}
