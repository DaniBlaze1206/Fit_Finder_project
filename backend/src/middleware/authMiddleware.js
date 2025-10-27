require('dotenv').config;
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');



const userFilePath = path.join(__dirname, '../data/users.json');


async function verifyToken(req, res, next) {
	const authHeaders = req.headers.authorization;
	if(!authHeaders || !authHeaders.startsWith('Bearer ')){
		return res.status(401).josn({ message: 'Authorization token missing'});
	};

	const token = authHeaders.split(' ')[1];

	try {
		
		const decoded = jwt.verify(token, process.env.JWT_TOKEN);
		req.user = decoded;


		const text = await fs.readFile(userFilePath, 'utf8');
		const users = text? JSON.parse(text): [];

		const user = users.find(u => u.id === decoded.id);

		if(!user) {
			return res.status(404).json({ message: 'User not found'});
		}

		const { password, ...safeUser } = user;
		req.body = safeUser;

		next();
	} catch (err) {
		console.error('Token verify error: ', err);
		return res.status(401).jsoi({ message: 'Invalid or expired token'});
	}
}


module.exports = verifyToken