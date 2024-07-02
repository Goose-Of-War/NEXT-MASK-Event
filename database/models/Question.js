import mongoose from 'mongoose';

import connectToDb from '../connect';

const questionSchema = new mongoose.Schema({
	quizId: { type: String, required: true },
	questionNo: { type: Number, required: true },
	title: { type: String, required: false },
	question: { type: String, required: false },
	type: { type: String, required: true, enum: ['text', 'mcq'] },
	options: [String],
	answer: { type: [Number, [String]], required: true }
}, { collection: 'questions' });

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;

export async function fetchQuestionsOfQuiz (quizId) {
	await connectToDb();
	return await Question.find({ quizId: quizId || process.env.QUIZ_ID }).lean().sort({ questionNo: 'asc' });
}
