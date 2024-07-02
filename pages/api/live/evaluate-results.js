import connectToDb from "@/database/connect";
import { fetchQuestionsOfQuiz } from "@/database/models/Question";
import { fetchRecordsByQuizId } from "@/database/models/Record";
import { updateQuizRecords } from "@/database/models/Result";
import { getAllUsers } from "@/database/models/User";
import cachedResults from "@/utils/cachedResults";
import evaluateResponse from "@/utils/evaluateRecords";
import handlerContext from "@/utils/handlerContext";

export default async function evaluateResultsHandler (req, res) {
	// Admin only
	if (!req.cookies.isAdmin) return res.status(401).send('Unauthorized resource.');
	const { quizId } = handlerContext;
	const results  = [];
	// console.log(cachedResults);
	await connectToDb();
	const questions = await fetchQuestionsOfQuiz(quizId);
	const records = await fetchRecordsByQuizId(quizId);
	const users = await getAllUsers();
	records.forEach(({ userId, questionNo, response }) => {
		if (!results.find(r => r.userId === userId)) results.push({
			userId,
			username: users.find(u => u._id === userId).username,
			name: users.find(u => u._id === userId).name,
			points: 0
		});
		const { answer, type } = questions.find(q => q.questionNo === questionNo);
		results.find(r => r.userId === userId).points += evaluateResponse(response, answer, type);
		// console.log(response, answer, type, evaluateResponse(response, answer, type));
	});
	cachedResults.results = results;
	await updateQuizRecords(results, quizId);
	return res.status(201).send('Successfully re-evaluated');
}
