import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBirthdayReminderEmail = async (name: string, date: Date) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TARGET_EMAIL || 'ertsshehan@gmail.com',
    subject: `Upcoming Birthday Reminder: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4F46E5;">Birthday Reminder 🎉</h2>
        <p>Hello,</p>
        <p>This is an automated reminder that <strong>${name}</strong>'s birthday is coming up tomorrow, <strong>${date.toDateString()}</strong>!</p>
        <p>Don't forget to wish them a Happy Birthday!</p>
        <br/>
        <p>Best Regards,</p>
        <p>Your Birthday Reminder System</p>
      </div>
    `,
  };

  let retries = 5;
  while (retries > 0) {
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Reminder email sent for ${name}`);
      return;
    } catch (error) {
      retries--;
      console.error(`Error sending email for ${name}. Retries left: ${retries}`, error);
      if (retries === 0) {
        console.error(`Failed to send email for ${name} after 5 attempts.`);
        throw error;
      }
      await new Promise(res => setTimeout(res, 1000));
    }
  }
};
