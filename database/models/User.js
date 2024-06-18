const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	name: String,
	username: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	profilePic: String
}, { collection: 'users' });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
