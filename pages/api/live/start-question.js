import { addMultipleRecords } from "@/database/models/Record";
import handlerContext from "@/utils/handlerContext";

export default async function StartQuestionHandler (req, res) {
	// Admin only
	if (!req.cookies.isAdmin) return res.status(403).send('Access restricted.');
	console.log(handlerContext);
	// If another question is running, stop
	if (handlerContext.currentQuestion) return res.status(401).send(`Question ${handlerContext.currentQuestion} is running. Wait for it to be done.`);
	// Set process env variable
	handlerContext.currentQuestion = ~~req.body.questionNo;
	setTimeout(() => {
		handlerContext.currentQuestion = null;
		addMultipleRecords(handlerContext.cachedRecords).then(() => handlerContext.cachedRecords = []);
	}, req.body.type === 'mcq' ? 15_000 : 25_000);
	return res.status(200).send('Question updated');
}
