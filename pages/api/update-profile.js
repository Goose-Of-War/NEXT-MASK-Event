import User, { getUserFromSession } from "@/database/models/User";

export default async function updateProfileHandler (req, res) {
	const { username } = req.body;
	if (!req.cookies.isAdmin && (await getUserFromSession(req.cookies.sessionId)).username !== username) return res.status(401).send('Not authorized');
	const user = await User.findOne({ username });
	if (!user) return res.status(404).send('User does not exist.');
	if (req.body.name !== undefined) user.name = req.body.name;
	if (req.body.profilePic !== undefined) user.profilePic = req.body.profilePic;
	await user.save();
	return res.status(200).send('Successfully updated.');
}
