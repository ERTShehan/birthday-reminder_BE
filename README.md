# Birthday Reminder - Backend

This is the Express & MongoDB backend for the Birthday Reminder application. It exposes an API to save birthdays and runs a daily cron job to send email reminders.

## Prerequisites
- Node.js (v18+)
- MongoDB Database (Local or MongoDB Atlas)
- Gmail App Password (for Nodemailer)

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Create a `.env` file in the root of the backend folder and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   TARGET_EMAIL=your_email@gmail.com
   ```

3. Run the development server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000/`.

## Deployment (Vercel)
To deploy this Express backend on Vercel:
1. A `vercel.json` configuration file is included to map all routes to the Express entry point.
2. Push your code to a GitHub repository.
3. Go to Vercel, click **Add New Project**, and select your repository.
4. Set the Root Directory to `backend`.
5. Under Environment Variables, add your `MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`, and `TARGET_EMAIL`.
6. Deploy.

> Note: Serverless environments like Vercel sleep when inactive. The `node-cron` job will **not** run reliably on Vercel because the server doesn't stay alive 24/7. To run scheduled tasks in Vercel, you must use **Vercel Cron Jobs** (by creating an API endpoint and a `vercel.json` crons configuration).
