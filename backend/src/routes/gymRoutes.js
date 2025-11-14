// src/routes/gymRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const ROLES = require('../config/roles');

const {
  getAllGyms,
  getGymById,
  createGym,
} = require('../controllers/gymController');

router.get('/', getAllGyms);


router.get('/:id', verifyToken, getGymById);

router.post(
  '/',
  verifyToken,
  authorizeRoles(ROLES.ADMIN, ROLES.CLUB_MANAGER),
  createGym
);

module.exports = router;
