import express from 'express';
import dotenv from 'dotenv';
import log4js from 'log4js';

import getData from './api/get-data.js';
import postData from './api/post-data.js';

dotenv.config();
log4js.configure("./config/log4js.json");

const logger = log4js.getLogger("app");
logger.info("this should give me a line number now");

const app = express();
const port = process.env.PORT || 3000;

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(express.json()) // for parsing application/json

app.get('/api/get-data', getData)
app.post('/api/post-data', postData)

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`)
})
