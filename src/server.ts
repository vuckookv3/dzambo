import http from 'http';
import app from './app';
import sanitizedConfig from './config';

const server = http.createServer(app);

server.listen(sanitizedConfig.PORT, () => {
	console.log('Started backend on:', sanitizedConfig.PORT);
});
