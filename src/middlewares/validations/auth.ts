import { body } from 'express-validator';
import validate from '../validate';

export const authLoginValidate = [
	body('email').isString().isEmail(),
	body('password').isString().isLength({ min: 5 }),
	validate,
];
