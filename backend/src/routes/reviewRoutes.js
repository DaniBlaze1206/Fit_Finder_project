const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');
const ROLES = require('../config/roles');

const {
  createReview,
  getReviewsForGym,
  deleteReview,
  editReview
} = require('../controllers/reviewController');

router.post('/', verifyToken, createReview);

router.get('/gym/:gymId', getReviewsForGym);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles(ROLES.ADMIN),
  deleteReview
);


router.patch(
  '/:id',
  verifyToken,
  editReview
);

module.exports = router;
