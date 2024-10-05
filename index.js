import express from 'express';
import dotenv from 'dotenv';
import log4js from 'log4js';

import getAptTrd from './api/get-apt-trd.js';
import getAptInfo from './api/get-apt-info.js';

dotenv.config();
log4js.configure("./config/log4js.json");

const logger = log4js.getLogger("app");
const app = express();
const port = process.env.PORT || 3000;

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(express.json());

app.get('/api/get-apt-trd', getAptTrd);
app.get('/api/get-apt-info', getAptInfo);

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`)
})
