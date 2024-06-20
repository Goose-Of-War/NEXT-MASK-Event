import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	quizId: { type: String, required: true, default: 'OCAQ-2024' },
	points: Number
}, { collection: 'results' });

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export default Result;
