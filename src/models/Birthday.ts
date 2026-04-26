import mongoose, { Document, Schema } from 'mongoose';

export interface IBirthday extends Document {
  name: string;
  date: Date;
}

const birthdaySchema = new Schema<IBirthday>({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true
});

const Birthday = mongoose.model<IBirthday>('Birthday', birthdaySchema);

export default Birthday;
