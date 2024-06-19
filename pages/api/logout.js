export default function logoutHandler (req, res) {
	// only POST requests
	if (req.method !== 'POST') return res.status(403).send('Invalid route.');
	// don't allow someone if they don't have a session ID
	if (!req.cookies.sessionId) return res.status(403).send(`You aren't logged in.`);
	res.setHeader('Set-Cookie', `sessionId=; path=/;`)
	res.status('201').send('Eda mone');
}
