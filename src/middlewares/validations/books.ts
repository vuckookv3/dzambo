import { body } from 'express-validator';
import validate from '../validate';

export const bookCreateOneValidation = [
	body('title').isString(),
	body('publisher').isString(),
	body('datePublished').isDate(),
	body('category').isString(),
	validate,
];
