const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const {
  createReservation,
  getMyReservations,
  getAllReservations,
  getReservationsForGym
} = require('../controllers/reservationController');


router.post('/', verifyToken, createReservation);


router.get('/me', verifyToken, getMyReservations);


router.get('/', verifyToken, authorizeRoles('admin'), getAllReservations);

router.get(
  '/gym/:gymId',
  verifyToken,
  authorizeRoles('admin', 'club-manager'),
  getReservationsForGym
);

module.exports = router;
