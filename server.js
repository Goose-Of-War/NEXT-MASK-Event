import { configDotenv } from "dotenv";
import { createServer } from "node:http";
import next from "next";
import  { Server } from "socket.io";

import connectToDb from "./database/connect.js";
import { getUserFromSession } from "./database/models/User.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

configDotenv();

app.prepare().then(async () => {
	const httpServer = createServer(handler);
	await connectToDb();
	const io = new Server(httpServer);

	io.on("connection", (socket) => {
		console.log('Connection count:', io.engine.clientsCount);
		socket.join(process.env.QUIZ_ID);

		socket.on('question', question => {
			io.to(process.env.QUIZ_ID).emit('question', question);
			setTimeout(() => io.to(process.env.QUIZ_ID).emit('timeout', ''), question.type === 'mcq' ? 11_000 : 21_000);
		});
	});

	httpServer
		.once("error", (err) => {
			console.error(err);
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`Ready on http://${hostname}:${port}`);
		});
});
