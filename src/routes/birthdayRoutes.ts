import express from 'express';
import { addBirthday, getBirthdays } from '../controllers/birthdayController';

const router = express.Router();

router.route('/').post(addBirthday).get(getBirthdays);

export default router;
