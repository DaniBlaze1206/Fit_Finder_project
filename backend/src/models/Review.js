class Review {
	constructor(id, userId, gymId, rating, comment) {
		this.id = id;
		this.userId = userId;
		this.gymId = gymId;
		this.rating = rating;
		this.comment = comment;
	};
};


module.exports = Review;