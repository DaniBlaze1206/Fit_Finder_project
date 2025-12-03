class Review {
	constructor(id, userId, gymId, rating, comment, bio = "", profilePicUrl = "") {
		this.id = id;
		this.userId = userId;
		this.gymId = gymId;
		this.rating = rating;
		this.comment = comment;

		this.bio = bio;
    	this.profilePicUrl = profilePicUrl;
	};
};


module.exports = Review;