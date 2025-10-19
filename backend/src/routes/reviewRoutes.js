const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const reviewFilePath = path.join(__dirname, '../data/reviews.json');

router.get('/', (req, res) => {
	fs.readFile(reviewFilePath, 'utf8', (err, data) => {
		if(err){
			return res.status(500).json({ message: 'Error reading review file'});
		};
		let reviews = [];
		try {
			reviews = data? JSON.parse(data): [];
		} catch (error) {
			res.status(500).json({ message: 'Invalid JSON format'});
		};
		res.json(reviews);
	});
});


router.get('/:id', (req, res) => {
	const reviewId = parseInt(req.params.id);
	fs.readFile(reviewFilePath, 'utf8', (err, data) => {
		if(err) {
			return res.status(500).json({ message: 'Error reading review file'});
		};
		let reviews = [];
		try {
			reviews = data? JSON.parse(data): [];
		} catch (error) {
			res.status(500).json({ message: 'Invalid JSON format'});
		};
		const review = reviews.find(u => u.id === reviewId);
		if(!review){
			return res.status(404).json({ message: 'Review not found...'});
		};
		res.json(review);
	});
});


module.exports = router;