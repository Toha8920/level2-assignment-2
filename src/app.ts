import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/user/user.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Welcome to my api world');
});

export default app;
