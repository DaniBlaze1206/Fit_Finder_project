const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const { getProfile, getAllUsers, updateUser, updatePassword } = require('../controllers/userController');





router.get('/', verifyToken, authorizeRoles('admin'), getAllUsers);

router.get('/me', verifyToken, getProfile);

router.patch('/me', verifyToken, updateUser);

router.patch('/me/password', verifyToken, updatePassword);

module.exports = router;