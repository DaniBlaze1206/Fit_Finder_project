const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');



const userFilePath = path.join(__dirname, '../data/users.json');



router.get('/', (req, res) => {
	fs.readFile(userFilePath, 'utf8', (err, data) => {
		if(err) {

			return res.status(500).json({ message: 'Error reading users file'});
		};

		let users = [];

		try{
			users = data? JSON.parse(data): [];
		} catch (error) {
			return res.status(500).json({ message: 'Invalid JSON format'})
		};

		

		res.json(users);
	})
});


router.get( '/:id', verifyToken, (req, res) => {
	const userId = parseInt(req.params.id);

	fs.readFile(userFilePath, 'utf8',(err, data) => {
		if(err) {

			return res.status(500).json({ message: 'Error reading users file'});
		};
		let users = [];
		try {
			users = data? JSON.parse(data): [];
		} catch (error) {
			res.status(500).json({ message: 'Invalid JSON format'});
		};
		const user = users.find( u => u.id === userId);
		if(!user) {
		return res.status(404).json({ message: 'User not found...'});
		};
		res.json(user);
		
		
	});
});

module.exports = router;