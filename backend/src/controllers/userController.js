const fs = require('fs').promises;
const path = require('path');
const userFilePath = path.join(__dirname, '../data/users.json');


const readUser = async () => {
	const text = await fs.readFile(userFilePath, 'utf8');
	const users = text? JSON.parse(text): [];
};

const writeFile = async (users) => {
	await fs.writeFile(userFilePath, JSON.stringify(users, null, 2));
};


// get profile
const getProfile = async (req, res) => {
	try {
		const users = await readUser();
		const user = users.find(u => u.id === req.user.id);
		if(!user) return res.status(404).json({ error: 'user not found'});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ error: 'error while getting profile'})
	}
}
// get all users
const getAllUsers = async (req, res) => {
	try {
		const users = await readUser();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: 'error getting all users'});
	}
}
// update user

const updateUser = async (req, res) => {
	try {
    const users = await readUser();
    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    await writeUsers(users);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};


module.exports = {
	getProfile,
	getAllUsers,
	updateUser
};