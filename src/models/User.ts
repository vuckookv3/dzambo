import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema<IUser, UserModel>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ['Admin', 'Author'],
			required: true,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// HOOKS
UserSchema.pre('save', async function () {
	if (this.isModified('password')) {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(this.password, salt);
		this.password = hash;
	}
});

// METHODS

UserSchema.method(
	'comparePassword',
	function comparePassword(password: string) {
		return bcrypt.compareSync(password, this.password);
	}
);

UserSchema.method('generateJWT', function generateJWT() {
	const data: any = { _id: this._id };

	return (
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		'JWT ' + jwt.sign(data, process.env.JWT_SECRET!)
	);
});

export interface IUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IUserMethods {
	comparePassword: (password: string) => boolean;
	generateJWT: () => string;
}

export interface IUserStatics {}

type UserModel = Model<IUser, IUserStatics, IUserMethods>;

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
