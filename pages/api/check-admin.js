import connectToDb from "@/database/connect";
import { getUserFromSession } from "@/database/models/User";

export default async function checkAdminHandler (req, res) {
	// Session needed to perform stuff
	if (!req.cookies.sessionId) return res.status(403).send('Forbidden resource.');
	// Valid session needed to perform stuff
	await connectToDb();
	const user = await getUserFromSession(req.cookies.sessionId);
	if (!user) return res.status(403).send('Forbidden resource.');
	// Set if true or false
	res.setHeader('Set-Cookie', `isAdmin=${Boolean(user.isAdmin)}; path=/;`);
	return res.status(201).send(Boolean(user.isAdmin));
}
