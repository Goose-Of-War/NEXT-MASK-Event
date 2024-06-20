import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
	quizId: { type: String, required: true, default: 'OCAQ-2024' },
	QuestionNo: { type: Number, required: true },
	question: { type: [String], required: true },
	type: { type: String, required: true, enum: ['text', 'mcq'] },
	answer: { type: [Number, [String]], required: true }
}, { collection: 'questions' });

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;
