import connectToDb from "@/database/connect";
import { fetchQuestionsOfQuiz } from "@/database/models/Question";

export default async function fetchQuestionHandler (req, res) {
	// Only for admins
	if (!req.cookies.isAdmin) return res.status(403).send('Forbidden access.');
	// Connect to DB once for safety purposes
	await connectToDb();
	const questions = await fetchQuestionsOfQuiz();
	// console.log(questions);
	res.status(201).json(questions);
}
