import { Schema, model, Model, Types } from 'mongoose';

const BookSchema = new Schema<IBook, BookModel>(
	{
		title: {
			type: String,
			required: true,
		},
		publisher: {
			type: String,
			required: true,
		},
		datePublished: {
			type: Date,
			required: true,
		},
		category: {
			type: String,
			default: null,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

// HOOKS

// METHODS

// STATICS

export interface IBook {
	title: string;
	publisher: string;
	datePublished: Date;
	category: string | null;
	author: Types.ObjectId;
}

export interface IBookMethods {}

export interface IBookStatics {}

type BookModel = Model<IBook, IBookStatics, IBookMethods>;

const Book = model<IBook, BookModel>('Book', BookSchema);

export default Book;
