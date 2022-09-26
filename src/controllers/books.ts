import { Request, Response } from 'express';
import User from '../models/User';
import _ from 'lodash';
import Book from '../models/Book';

export const booksGetAll = async (req: Request, res: Response) => {
	const query: any = {};

	if (req.user.role === 'Author') {
		query.author = req.user._id;
	}

	const books = await Book.find(query).exec();

	res.json({ data: books });
};

export const bookCreateOne = async (req: Request, res: Response) => {
	const data = _.pick(req.body, [
		'title',
		'publisher',
		'datePublished',
		'category',
	]);

	const book = new Book({ ...data, author: req.user._id });

	await book.save();

	res.json({ data: book });
};

export const bookGetOne = async (req: Request, res: Response) => {
	const query: any = {};

	query._id = req.params.id;
	if (req.user.role === 'Author') {
		query.author = req.user._id;
	}

	const book = await Book.findOne(query).exec();
	if (!book) return res.status(404).json({ error: 'Book not found' });

	res.json({ data: book });
};

export const bookUpdateOne = async (req: Request, res: Response) => {
	const query: any = {};

	query._id = req.params.id;
	if (req.user.role === 'Author') {
		query.author = req.user._id;
	}

	const book = await Book.findOne(query).exec();
	if (!book) return res.status(404).json({ error: 'Book not found' });

	const data = _.pick(req.body, [
		'title',
		'publisher',
		'datePublished',
		'category',
	]);

	book.set({ ...data });
	await book.save();

	res.json({ data: book });
};

export const bookDeleteOne = async (req: Request, res: Response) => {
	const query: any = {};

	query._id = req.params.id;
	if (req.user.role === 'Author') {
		query.author = req.user._id;
	}

	const book = await Book.findOne(query).exec();
	if (!book) return res.status(404).json({ error: 'Book not found' });

	await book.remove();

	res.json({});
};
