import { Request, Response } from 'express';
import User from '../models/User';
import _ from 'lodash';

export const userGetAll = async (req: Request, res: Response) => {
	// todo filteri i paginacija
	const users = await User.find().exec();

	res.json({ data: users });
};

export const userCreateOne = async (req: Request, res: Response) => {
	const { email, password, firstName, lastName } = req.body;

	const user = new User({
		email,
		password,
		firstName,
		lastName,
		role: 'Author',
	});

	try {
		await user.save();
	} catch (err) {
		// TODO ispitati err
		// console.log(err);
		return res
			.status(409)
			.json({ error: 'User with that email already exists' });
	}

	res.status(201).json({ data: user });
};

export const userGetOne = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id).exec();
	if (!user) return res.status(404).json({ error: 'User not found' });

	res.json({ data: user });
};

export const userUpdateOne = async (req: Request, res: Response) => {
	const data = _.pick(req.body, [
		'email',
		'password',
		'firstName',
		'lastName',
	]);

	const user = await User.findById(req.params.id).exec();
	if (!user) return res.status(404).json({ error: 'User not found' });

	user.set({ ...data });

	await user.save();

	res.json({ data: user });
};

export const userDeleteOne = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id).exec();
	if (!user) return res.status(404).json({ error: 'User not found' });

	if (user.role === 'Admin') {
		if (user.isActive) return res.status(403).json({});
	}

	await user.remove();

	res.json({});
};
