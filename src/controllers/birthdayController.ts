import { Request, Response } from 'express';
import Birthday from '../models/Birthday';

export const addBirthday = async (req: Request, res: Response) => {
  try {
    const { name, date } = req.body;

    if (!name || !date) {
      return res.status(400).json({ message: 'Name and date are required' });
    }

    const birthday = new Birthday({
      name,
      date,
    });

    const createdBirthday = await birthday.save();
    res.status(201).json(createdBirthday);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBirthdays = async (req: Request, res: Response) => {
  try {
    const birthdays = await Birthday.find({});
    res.json(birthdays);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
