class Gym {
	constructor(id, name, location, services, price, hours, managerId, bio = "", profilePicUrl = "") {
		this.id = id;
		this.name = name;
		this.location = location;
		this.services = services;
		this.price = price;
		this.hours = hours;
		this.managerId = managerId;	
		this.bio = bio;
		this.profilePicUrl = profilePicUrl;	
	};
};


module.exports = Gym;