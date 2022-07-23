import express, { Express, Request, Response } from 'express';
import { client } from '../db/redis'
import {query} from '../db/sql'
export const router = express.Router();

router.get("/",async (req:Request, res:Response)=>{
    const sqlData=await query("select * from Grade")
    const redisData=await client.json.get("PERSON")
    res.status(200).json({ message: {
        redis:redisData,
        sql:sqlData
    } });
});