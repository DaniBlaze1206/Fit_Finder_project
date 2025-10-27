require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = process.env.JWT_TOKEN;
const userFilePath = path.join(__dirname, '../data/users.json');

async function readUsers() {
	try {
		const text = await fs.readFile(userFilePath, 'utf8');
		return text ? JSON.parse(text) : [];
	} catch (error) {
		if (error.code === 'ENOENT') return [];
		throw error;
	}
}

async function writeUsers(users) {
	const text = JSON.stringify(users);
	await fs.writeFile(userFilePath, text, 'utf8');
}

// Register route
// Register route
router.post(
  '/register',
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const users = await readUsers();
      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(409).json({ message: 'Email is already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

     
      const role = 'user';

      const newUser = new User(newId, username, email, hashedPassword, role, new Date().toISOString());
      users.push(newUser);
      await writeUsers(users);

      const { password: _, ...safeUser } = newUser;
      return res.status(201).json({ message: 'New user registered', user: safeUser });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ message: 'Server error during registration' });
    }
  }
);


// Login route
router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const users = await readUsers();
		const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
		if (!user) {
			return res.status(400).json({ message: 'Invalid Email or Password' });
		}

		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
			return res.status(400).json({ message: 'Invalid Email or Password' });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			JWT_TOKEN,
			{ expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
		);

		res.status(200).json({
			message: 'Login successful',
			token,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server Error' });
	}
});

module.exports = router;
