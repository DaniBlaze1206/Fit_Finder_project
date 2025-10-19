class Reservation {
	constructor(id, userId, gymId, date, time) {
		this.id = id;
		this.userId = userId;
		this.gymId = gymId;
		this.date = date;
		this.time = time;
	};
};

module.exports = Reservation;