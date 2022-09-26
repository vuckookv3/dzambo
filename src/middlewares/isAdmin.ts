import { Request, Response, NextFunction } from 'express';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const user = req.user;
	if (!user) {
		console.trace(
			'You must call isLoggedIn middleware before this one (isAdmin)'
		);
		return res.status(500).json({
			error: 'Internal Server Error',
		});
	}

	if (user.role !== 'Admin')
		return res
			.status(403)
			.json({ error: 'You dont have permission to do that' });

	next();
};

export default isAdmin;
