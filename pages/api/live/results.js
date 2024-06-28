import { fetchResultsOfQuiz } from "@/database/models/Result";
import { getAllUsers } from "@/database/models/User";
import cachedResults from "@/utils/cachedResults";
import handlerContext from "@/utils/handlerContext";

export default async function resultsHandler (req, res) {
	if (!req.cookies.sessionId) return res.status(401).send('Log in first.');
	if (!cachedResults.results.length) {
		const results = await fetchResultsOfQuiz(handlerContext.quizId);
		const users = await getAllUsers();
		cachedResults.results = results.map(r => {
			const result = { points: r.points };
			result.username = users.find(u => u._id === r.userId).username;
			result.name = users.find(u => u._id === r.userId).name;
			return result;
		});
	}
	return res.status(200).json(cachedResults.results);
}
