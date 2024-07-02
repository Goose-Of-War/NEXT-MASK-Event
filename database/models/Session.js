import mongoose from 'mongoose';

import connectToDb from '../connect.js';

const sessionSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	userId: { type: String, required: true }
}, { collection: 'sessions' });

const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;

export async function generateSession (userId) {
	await connectToDb();
	const newSession = new Session({ _id: [11, 6]
			.map(i => [...Array(i)].map(
				() => String.fromCharCode((Math.random() > 0.5 ? 65 : 97) + Math.floor(26 * Math.random()))
			).join(''))
			.join('-'),
		userId });
	await newSession.save();
	return newSession._id;
}
