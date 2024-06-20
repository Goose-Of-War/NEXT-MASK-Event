import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	quizId: { type: String, required: true, default: 'OCAQ-2024' },
	QuestionNo: { type: Number, required: true },
	response: String
}, { collection: 'records' });

const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);

export default Record;
