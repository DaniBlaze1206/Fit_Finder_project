const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const gymFilePath = path.join(__dirname, '../data/gyms.json')

router.get('/', (req, res) => {
	fs.readFile(gymFilePath, 'utf8', (err, data) => {
		if(err) {
			return res.status(500).json({ message: 'Error reading gyms file'});
		};
		let gyms = [];
		try {
			gyms = JSON.parse(data);
		} catch (error) {
			return res.status(500).json({ message: 'Invalid JSON format'});
		};
		

		res.json(gyms);
	});
});

router.get('/:id', (req, res) => {
	const gymId = parseInt(req.params.id);
	fs.readFile(gymFilePath, 'utf8', (err, data) => {
		if(err){
			return res.status(500).json({ message: 'Error reading gyms file'});
		};
		let gyms = [];
	
		try {
			gyms = data? JSON.parse(data) : [];
		} catch (error) {
			res.status(500).json({ message: 'Invalid JSON format'});
		};
		const gym = gyms.find(u => u.id === gymId);
		if(!gym){
			return res.status(404).json({ message: 'Gym not found...'})
		};
		res.json(gym);
	})
})


module.exports = router;