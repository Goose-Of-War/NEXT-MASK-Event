import bcrypt from 'bcrypt';

import connectToDb from '@/database/connect';
import User from "@/database/models/User";
import { generateSession } from '@/database/models/Session';

export default async function registerHandler (req, res) {
	// only POST requests
	if (req.method !== 'POST') return res.status(403).send('Invalid route.');
	// don't allow someone if they already have a session ID
	if (req.cookies.sessionId) return res.status(403).send('You are already logged in...');
	
	const { name, username, password } = req.body;
	try {
		await connectToDb();
		const newUser = new User({
			_id:  [4, 3, 2]
				.map(i => [...Array(i)].map(() => Math.floor(10 * Math.random())).join(''))
				.join('-'),
			name,
			username,
			passwordHash: await bcrypt.hash(password, 7)
		});
		await newUser.save();
		res.setHeader('Set-Cookie', `sessionId=${await generateSession(newUser._id)}; Path=/`)
		return res.status(201).send({ username, name });
	} catch (err) {
		return res.status(500).send(err.toString());
	}
}
