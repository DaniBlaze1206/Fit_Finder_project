class Gym {
	constructor(id, name, location, services, price, hours, managerId) {
		this.id = id;
		this.name = name;
		this.location = location;
		this.services = services;
		this.price = price;
		this.hours = hours;
		this.managerId = managerId;		
	};
};


module.exports = Gym;