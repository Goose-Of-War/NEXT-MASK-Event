import { getUserFromSession } from "@/database/models/User";
import handlerContext from "@/utils/handlerContext";

export default async function saveResponseHandler (req, res) {
	if (!req.cookies.sessionId) return res.status(401).send('You are not logged in.');
	const user = await getUserFromSession(req.cookies.sessionId);
	const { questionNo, response } = req.body;
	if (handlerContext.currentQuestion !== questionNo) return console.log({
		clientQuestionNo: questionNo,
		serverQuestionNo: handlerContext.currentQuestion
	}) || res.status(400).send('Question numbers are not matching.');
	handlerContext.cachedRecords.push({
		quizId: handlerContext.quizId,
		userId: user._id,
		questionNo,
		response
	});
	console.log(handlerContext.cachedRecords);
	return res.status(201).send('Record created');
}
