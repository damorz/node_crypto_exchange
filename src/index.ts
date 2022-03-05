import express, { Application, Request, Response } from 'express';
import router from './routes/index';
import cors from 'cors';
import config from './config/config';
import { db } from './models';

const app: Application = express();

console.time('[Server] Run times');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  res.status(200).send(data);
});

app.use('/api', router);

app.listen(config.port, () => {
  console.log(`[Server] Running on port ${config.port}`);
});

db.sequelize.sync().then(() => {
  console.log(`[Server] Database sync complete.`);
});

console.timeEnd('[Server] Run times');
export default app;
