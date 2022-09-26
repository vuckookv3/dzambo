import { Request, Response } from 'express';
import User from '../models/User';

export const authLogin = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select('+password').exec();
	if (!user) return res.status(401).json({ error: 'No user found' });

	const isPasswordMatch = user.comparePassword(password);
	if (!isPasswordMatch)
		return res.status(401).json({ error: 'No user found' });

	if (!user.isActive)
		return res.status(403).json({ error: 'User is deactivated' });

	const token = user.generateJWT();

	res.json({ token });
};

export const authDeactivateOwnAccount = async (req: Request, res: Response) => {
	const user = req.user;

	user.isActive = false;

	await user.save();

	res.json({});
};
