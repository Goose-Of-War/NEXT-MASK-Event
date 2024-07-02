import User from "@/database/models/User";

export default async function adminPromoteHandler (req, res) {
	if (req.body.secret !== process.env.ADMIN_SECRET) return res.status(403).send('NO');
	const user = await User.findOne({ username: req.body.username });
	if (!user) return res.status(400).send('Invalid credentials.');
	user.isAdmin = true;
	console.log(user);
	await user.save();
	return res.status(201).send('Promoted to admin');
}
