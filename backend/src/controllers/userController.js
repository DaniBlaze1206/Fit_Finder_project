const fs = require('fs').promises;
const path = require('path');
const userFilePath = path.join(__dirname, '../data/users.json');
const bcrypt = require('bcrypt');


const readUser = async () => {
	try {
		const text = await fs.readFile(userFilePath, 'utf8');
		return text ? JSON.parse(text) : [];
	} catch (err) {
		console.error('Error reading users file:', err);
		return [];
	}
};


const writeUsers = async (users) => {
	await fs.writeFile(userFilePath, JSON.stringify(users, null, 2));
};



const getProfile = async (req, res) => {
  try {
    const users = await readUser();
    const user = users.find((u) => Number(u.id) === Number(req.user.id));
    if (!user) return res.status(404).json({ error: "User not found" });

    const { password, ...safeUser } = user;
    res.status(200).json(safeUser);
  } catch (error) {
    res.status(500).json({ error: "Error while getting profile" });
  }
};

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
    const userIndex = users.findIndex((u) => Number(u.id) === Number(req.user.id));
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    const existingUser = users[userIndex];

    // ✅ allow ONLY these fields
    const allowedUpdates = {
      username: req.body.username ?? existingUser.username,
      bio: req.body.bio ?? existingUser.bio ?? "",
      profilePicUrl: req.body.profilePicUrl ?? existingUser.profilePicUrl ?? "",
    };

    // (optional) basic validation
    if (allowedUpdates.username && String(allowedUpdates.username).trim().length < 2) {
      return res.status(400).json({ error: "Username is too short" });
    }

    users[userIndex] = { ...existingUser, ...allowedUpdates };
    await writeUsers(users);

    const { password, ...safeUser } = users[userIndex];
    res.status(200).json(safeUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating profile" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old and new passwords are required' });
    }

    const users = await readUser();
    const userIndex = users.findIndex(u => u.id === req.user.id);
    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    const user = users[userIndex];

    // Check correct old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;

    await writeUsers(users);

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Error updating password' });
  }
};

module.exports = {
	getProfile,
	getAllUsers,
	updateUser,
	updatePassword
};