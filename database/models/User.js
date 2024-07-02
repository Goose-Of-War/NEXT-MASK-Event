import mongoose from 'mongoose';

import Session from './Session.js';
import connectToDb from '../connect.js';

const userSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	name: String,
	username: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	profilePic: String,
	isAdmin: Boolean
}, { collection: 'users' });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

export async function getUserFromSession (sessionId) {
	await connectToDb();
	const user = User.findById((await Session.findById(sessionId))?.userId);
	return user;
}

export async function getAllUsers () {
	return await User.find().lean();
}
