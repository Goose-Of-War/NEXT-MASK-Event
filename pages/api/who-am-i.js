import { getUserFromSession } from "@/database/models/User";

export default async function whoAmIHandler (req, res) {
	if (!req.cookies.sessionId) return res.status(204).send();
	const user = await getUserFromSession(req.cookies.sessionId);
	return res.status(200).json(user);
}
