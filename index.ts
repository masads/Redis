import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from 'cors';
import { router } from './routes/routes';
import amqplib  from 'amqplib';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(json()); 
app.use(urlencoded({ extended: true })); 
app.use(morgan("dev")); 
app.use(cors())
app.use(router);

(async () => {
  const queue = 'tasks';
  const conn = await amqplib.connect('amqp://admin:admin123@192.168.86.20/');

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, (msg:any) => {
    if (msg !== null) {
      console.log('Recieved:', msg.content.toString());
      ch1.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });

  // Sender
  const ch2 = await conn.createChannel();

  setInterval(() => {
    ch2.sendToQueue(queue, Buffer.from('something to do'));
  }, 1000);
})();


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});