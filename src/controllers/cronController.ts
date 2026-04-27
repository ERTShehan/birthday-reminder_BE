import { Request, Response } from 'express';
import Birthday from '../models/Birthday';
import { sendBirthdayReminderEmail } from '../services/emailService';
import connectDB from '../config/db';

export const checkBirthdays = async (req: Request, res: Response) => {
  console.log('Running Vercel cron job to check birthdays...');

  try {
    await connectDB();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const targetMonth = tomorrow.getMonth();
    const targetDate = tomorrow.getDate();

    const birthdays = await Birthday.find();
    let emailsSent = 0;
    
    for (const b of birthdays) {
      const bDate = new Date(b.date);
      if (bDate.getMonth() === targetMonth && bDate.getDate() === targetDate) {
        console.log(`Found upcoming birthday for ${b.name}`);
        await sendBirthdayReminderEmail(b.name, b.date);
        emailsSent++;
      }
    }

    res.status(200).json({ message: `Cron job completed successfully. Sent ${emailsSent} reminder(s).` });
  } catch (error: any) {
    console.error('Error running cron job:', error);
    res.status(500).json({ message: 'Error running cron job', error: error.message });
  }
};
