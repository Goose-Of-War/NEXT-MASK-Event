import User from "@/database/models/User";

export default async function deleteUserHandler (req, res) {
	if (!req.cookies.isAdmin) return res.status(403).send('Forbidden');
	if (req.method !== 'POST') return res.status(400).send('Invalid method');
	await User.findByIdAndDelete(req.body._id);
	return res.status(201).send('Ironic status since it\'s being deleted');
}
