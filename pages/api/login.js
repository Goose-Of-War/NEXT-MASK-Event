import bcrypt from 'bcrypt';

import connectToDb from "@/database/connect";
import { generateSession } from '@/database/models/Session';
import User from "@/database/models/User";

export default async function loginHandler (req, res) {
	// only POST requests
	if (req.method !== 'POST') return res.status(403).send('Invalid route.');
	// don't allow someone if they already have a session ID
	if (req.cookies.sessionId) return res.status(403).send('You are already logged in...');

	const { username, password } = req.body;
	try {
		await connectToDb();
		const user = await User.findOne({ username });
		if (!user) return res.status(400).send('User does not exist');
		if (!await bcrypt.compare(password, user.passwordHash)) return res.status(400).send('Invalid credentials');
		res.setHeader('Set-Cookie', `sessionId=${await generateSession(user._id)}; Path=/`)
		return res.status(201).send({ username, name: user.name });
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.toString());
	}
}
