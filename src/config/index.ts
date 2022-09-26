import path from 'path';
import dotenv from 'dotenv';
import { IUser } from '../models/User';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
	NODE_ENV: string | undefined;
	PORT: number | undefined;
	MONGODB_STRING: string | undefined;
	JWT_SECRET: string | undefined;
	ADMIN: string | undefined;
}

interface Config {
	NODE_ENV: string;
	PORT: number;
	MONGODB_STRING: string;
	JWT_SECRET: string;
	ADMIN: Partial<IUser>;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
	return {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
		MONGODB_STRING: process.env.MONGODB_STRING || undefined,
		JWT_SECRET: process.env.JWT_SECRET || undefined,
		ADMIN: process.env.ADMIN
			? JSON.parse(process.env.ADMIN || '{}')
			: undefined,
	};
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitzedConfig = (config: ENV): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) {
			throw new Error(`Missing key ${key} in config.env`);
		}
	}
	return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
