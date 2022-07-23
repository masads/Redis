import { Client } from 'redis-om';
import { createClient } from 'redis'
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.REDIS_URL;

export const client = createClient( {url:url});
(async () => {
    try {
      await client.connect();
    } catch (err) {
      console.log(err);
    }
})();