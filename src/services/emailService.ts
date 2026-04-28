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
  const getOrdinalSuffix = (i: number) => {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const age = tomorrow.getFullYear() - date.getFullYear();
  const ageText = age > 0 ? `their <strong>${getOrdinalSuffix(age)}</strong> birthday` : "their birthday";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TARGET_EMAIL || 'ertsshehan@gmail.com',
    subject: `Upcoming Birthday Reminder: ${name} ${age > 0 ? '('+getOrdinalSuffix(age)+')' : ''}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4F46E5;">Birthday Reminder 🎉</h2>
        <p>Hello,</p>
        <p>This is an automated reminder that <strong>${name}</strong> will be celebrating ${ageText} tomorrow, <strong>${tomorrow.toDateString()}</strong>!</p>
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
