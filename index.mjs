import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import logger from 'morgan'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.get('/api/get-data', async (req, res) => {

  let params = req.query;
  console.log("params = " + JSON.stringify(params));
  params.i = Number(params.i);

  const client = new MongoClient(process.env.MONGODB_URI);

  let resData = {};

  try {

    await client.connect();
    const database = client.db("dbTest");
    const collection = database.collection("colTest");
    resData = await collection.find(params).limit(10).toArray();
    console.log(`resData = ${JSON.stringify(resData)}`);

  } catch (error) {
     throw error;
  } finally {
     await client.close();
  }

  res.json(resData);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
