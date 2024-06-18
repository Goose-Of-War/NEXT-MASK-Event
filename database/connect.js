const mongoose = require('mongoose');

export default async function connectToDb () {
	await mongoose.connect(process.env.MONGO_URL);
	return 'Connected';
}
