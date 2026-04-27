import cron from 'node-cron';
import Birthday from '../models/Birthday';
import { sendBirthdayReminderEmail } from '../services/emailService';

export const startCronJob = () => {
  cron.schedule('30 8 * * *', async () => {
    console.log('Running daily birthday check...');
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const targetMonth = tomorrow.getMonth();
      const targetDate = tomorrow.getDate();

      const birthdays = await Birthday.find();
      
      for (const b of birthdays) {
        const bDate = new Date(b.date);
        if (bDate.getMonth() === targetMonth && bDate.getDate() === targetDate) {
          console.log(`Found upcoming birthday for ${b.name}`);
          await sendBirthdayReminderEmail(b.name, b.date);
        }
      }
    } catch (error) {
      console.error('Error running cron job:', error);
    }
  });
  console.log('Cron job initialized');
};
