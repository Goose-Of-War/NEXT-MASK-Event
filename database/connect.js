import mongoose from 'mongoose';

export default async function connectToDb () {
	await mongoose.connect(process.env.MONGO_URL);
	return 'Connected';
}
