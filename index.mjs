import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import logger from 'morgan'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.get('/api/get-data', (req, res) => {

  let params = req.query;
  console.log("params = " + JSON.stringify(params));
  params.i = Number(params.i);

  const client = new MongoClient(process.env.MONGODB_URI, {
  });

  let resData = {};

  client.connect().then((db) => {
    return client.db("dbTest").collection("colTest")
      .find(params).limit(10).toArray();
  }).then((resData) => {
    console.log(`resData = ${JSON.stringify(resData)}`);
    res.json(resData);
  }).catch((error) => {
    throw error;
  }).finally(() => {
    client.close();
  });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
