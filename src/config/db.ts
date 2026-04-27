import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    throw error;
  }
};

export default connectDB;
