import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import client from './redis.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
const url = process.env.REDIS_URL;
app.use(cors());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
console.log(client.get('password'));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
