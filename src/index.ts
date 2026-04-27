import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import birthdayRoutes from './routes/birthdayRoutes';
import cronRoutes from './routes/cronRoutes';
import { startCronJob } from './jobs/cronJob';
import { checkBirthdays } from './controllers/cronController';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/birthdays', birthdayRoutes);
app.use('/api/cron', cronRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/cron/check-birthdays', (req, res) => {
  console.log("Cron job started...");
  checkBirthdays(req, res);
  res.status(200).send("Cron Job Executed");
});

if (process.env.NODE_ENV !== 'production') {
  startCronJob();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
