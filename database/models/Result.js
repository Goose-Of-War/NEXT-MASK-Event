import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	quizId: { type: String, required: true, default: 'OCAQ-2024' },
	points: Number
}, { collection: 'results' });

const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

export default Result;

export async function fetchResultsOfQuiz (quizId) {
	return await Result.find({ quizId });
}

export async function updateQuizRecords (results, quizId) {
	return await Promise.all(results.map(async ({ userId, points }) => {
		const result = (await Result.findOne({ userId, quizId })) || new Result({ userId, quizId });
		result.points = points;
		// console.log(result);
		return await result.save();
	}));
}
