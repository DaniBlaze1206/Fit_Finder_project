const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { getProfile, getAllUsers, updateUser } = require('../controllers/userController');


const userFilePath = path.join(__dirname, '../data/users.json');



router.get('/', verifyToken, authorizeRoles('admin'), getAllUsers);

router.get('/me', verifyToken, getProfile);

router.patch('/me', verifyToken, updateUser);

module.exports = router;