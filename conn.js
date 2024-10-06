import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import log4js from 'log4js';

dotenv.config();
const logger = log4js.getLogger('app');
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db('dbApt');

export { db };
