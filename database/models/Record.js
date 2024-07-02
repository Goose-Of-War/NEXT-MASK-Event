import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
	userId: { type: String, required: true },
	quizId: { type: String, required: true, default: 'OCAQ-2024' },
	questionNo: { type: Number, required: true },
	response: String
}, { collection: 'records' });

const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);

export default Record;

export async function addMultipleRecords (records) {
	return await Record.insertMany(records);
}

export async function fetchRecordsByQuizId (quizId) {
	return await Record.find({ quizId }).lean();
}
