const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


const reservationFilePath = path.join(__dirname, '../data/reservations.json');



router.get('/', (req, res) => {
	fs.readFile(reservationFilePath, 'utf8', (err, data) => {
		if(err){
			return res.status(500).json({ message: 'Error reading reservation file'});
		};
		let reservations = [];
		try {
			reservations = data? JSON.parse(data): [];
		} catch (error) {
			return res.status(500).json({ message: 'Invalid JSON format'});
		};
		res.json(reservations);
	});
});

router.get('/:id', (req, res) => {
	const reservationId = parseInt(req.params.id);
	fs.readFile(reservationFilePath, 'utf8', (err, data) => {
		if(err){
			return res.status(500).json({ message: 'Error reading reservation file'});
		};
		let reservations = [];
		try {
			reservations = data? JSON.parse(data): [];
		} catch (error) {
			return res.status(500).json({ message: 'Invalid JSON format'});
		};
		const reservation = reservations.find(u => u.id === reservationId);
		if(!reservation){
			return res.status(404).json({ message: 'Reservation not found...'})
		};
		res.json(reservation);
	});
});

module.exports = router;