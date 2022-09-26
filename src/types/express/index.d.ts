import { IUser, IUserDocument } from '../../models/User';

declare global {
	declare namespace Express {
		export interface Request {
			user: IUserDocument;
		}
	}
}
