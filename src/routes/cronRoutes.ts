import express from 'express';
import { checkBirthdays } from '../controllers/cronController';

const router = express.Router();

router.route('/check-birthdays').get(checkBirthdays);

export default router;
