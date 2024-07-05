import { getAllUsers } from "@/database/models/User";

export default async function fetchUsersHandler (req, res) {
	if (!req.cookies.isAdmin) return res.status(403).send('Forbidden');
	const users = await getAllUsers();
	console.log(users);
	return res.status(200).json(users);
}
