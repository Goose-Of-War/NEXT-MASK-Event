import User from "@/database/models/User";

export default async function fetchUserHandler (req, res) {
	if (!req.cookies.isAdmin) return res.status(403).send('Forbidden');
	const user = await User.findById(req.query.id);
	// console.log(user);
	return res.status(200).json(user);
}
