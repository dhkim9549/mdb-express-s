import express from "express";
import dotenv from "dotenv";
import log4js from "log4js";

import getAptTrd from "./api/get-apt-trd.js";
import getAptInfo from "./api/get-apt-info.js";
import getAptLog from "./api/get-apt-log.js";
import getKospiCap from "./api/get-kospi-cap.js";
import getLoanRate from "./api/get-loan-rate.js";
import getStockInfo from "./api/get-stock-info.js";

dotenv.config();
log4js.configure("./config/log4js.json");

const logger = log4js.getLogger("app");
const app = express();
const port = process.env.PORT || 3000;

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
app.use(express.json());

app.get("/api/get-apt-trd", getAptTrd);
app.get("/api/get-apt-info", getAptInfo);
app.get("/api/get-apt-log", getAptLog);

app.get("/api/get-kospi-cap", getKospiCap);

app.get("/api/get-loan-rate", getLoanRate);
app.get("/api/get-stock-info", getStockInfo);

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
