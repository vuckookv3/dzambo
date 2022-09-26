import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import routes from './routes';
import sanitizedConfig from './config';
import checkAndCreateFirstAdmin from './helpers/createFirstAdmin';

dotenv.config({ path: path.join(__dirname, '..', './.env') });

const app = express();

// Connection to DB
mongoose
	.connect(sanitizedConfig.MONGODB_STRING)
	.then(() => {
		checkAndCreateFirstAdmin();
		console.log('Connected to MongoDB!');
	})
	.catch((err) => {
		console.error('Could not connect to MongoDB...');
		console.error('Exiting...');
		process.exit(1);
	});

app.set('trust proxy', true);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', routes);

// catch 404
app.use((req: Request, res: Response) => {
	return res.status(404).json({ error: 'Route Not Found' });
});

// error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error('Unhandled Error:', err);
	return res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
