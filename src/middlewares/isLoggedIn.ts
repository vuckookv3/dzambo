import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import sanitizedConfig from '../config';
import User from '../models/User';

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
	const auth = req.headers.authorization;
	if (!auth)
		return res.status(401).json({ error: 'No auth header provided' });

	const [header, token] = auth.split(' ');
	if (!header || header !== 'JWT' || !token)
		return res.status(401).json({ error: 'No auth header provided' });

	let decoded = null;
	try {
		decoded = jwt.verify(token, sanitizedConfig.JWT_SECRET);
	} catch (err) {
		return res.status(401).json({ error: 'Token is not valid' });
	}

	if (!decoded || typeof decoded === 'string')
		return res.status(401).json({ error: 'Token is not valid' });

	const user = await User.findById(decoded._id).exec();
	if (!user) return res.status(401).json({ error: 'User not found' });
	if (!user.isActive)
		return res.status(401).json({ error: 'User is not active' });

	req.user = user;

	next();
};

export default isLoggedIn;