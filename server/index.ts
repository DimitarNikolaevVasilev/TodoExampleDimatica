import Server from './app';
import dotenv from 'dotenv';

dotenv.config();


const loggerOptions = {
	dev: {
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
				translateTime: true,
				ignore: 'pid,hostname'
			}
		}
	},
	prod: true
}

const logger = process.env.NODE_ENV === 'production' ? loggerOptions.prod : loggerOptions.dev;

const server = new Server({
	logger
});

const start = async () => {
	try {
		await server.start(process.env.PORT || 3000);
	} catch (err) {
		server.instance.log.error(err);
		process.exit(1);
	}
}

start();