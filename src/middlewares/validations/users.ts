import { body } from 'express-validator';
import validate from '../validate';

export const userCreateOneValidation = [
	body('email').isEmail(),
	body('password').isString().isLength({ min: 5 }),
	body('firstName').isString(),
	body('lastName').isString(),
	validate,
];
