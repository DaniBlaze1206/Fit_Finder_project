const fs = require('fs').promises;
const path = require('path');

const reviewFilePath = path.join(__dirname, '../data/reviews.json');
const gymFilePath = path.join(__dirname, '../data/gyms.json');

async function readReviews() {
  try {
    const text = await fs.readFile(reviewFilePath, 'utf8');
    return text ? JSON.parse(text) : [];
  } catch {
    return [];
  }
}

async function writeReviews(reviews) {
  await fs.writeFile(reviewFilePath, JSON.stringify(reviews, null, 2));
}

async function readGyms() {
  try {
    const text = await fs.readFile(gymFilePath, 'utf8');
    return text ? JSON.parse(text) : [];
  } catch {
    return [];
  }
}

const calculateAverageRating = (reviews) => {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Number((total / reviews.length).toFixed(1));
};


const createReview = async (req, res) => {
  try {
    let { gymId, rating, comment } = req.body;

    if (!gymId || rating == null) {
      return res.status(400).json({ message: 'gymId and rating are required' });
    }

    rating = Number(rating);
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'rating must be between 1 and 5' });
    }

    const gyms = await readGyms();
    const gym = gyms.find(g => g.id === Number(gymId));
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }

    const reviews = await readReviews();

    const newId = reviews.length
      ? Math.max(...reviews.map(r => r.id || 0)) + 1
      : 1;

    const newReview = {
      id: newId,
      userId: req.user.id,
      gymId: Number(gymId),
      rating,
      comment: comment || '',
      createdAt: new Date().toISOString()
    };

    reviews.push(newReview);
    await writeReviews(reviews);

    res.status(201).json({
      message: 'Review created',
      review: newReview
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
};


const getReviewsForGym = async (req, res) => {
  try {
    const gymId = Number(req.params.gymId);
    const reviews = await readReviews();

    const gymReviews = reviews.filter(r => r.gymId === gymId);
    const averageRating = calculateAverageRating(gymReviews);

    res.status(200).json({
      gymId,
      averageRating,
      reviews: gymReviews
    });
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ message: 'Error getting reviews' });
  }
};


const deleteReview = async (req, res) => {
  try {
    const reviewId = Number(req.params.id);
    const reviews = await readReviews();

    const exists = reviews.some(r => r.id === reviewId);
    if (!exists) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const updated = reviews.filter(r => r.id !== reviewId);
    await writeReviews(updated);

    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};


const editReview = async (req, res) => {
  try {
    const reviewId = Number(req.params.id);
    const { rating, comment } = req.body;

    const reviews = await readReviews();
    const index = reviews.findIndex(r => r.id === reviewId);

    if (index === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const review = reviews[index];

   
    if (req.user.role !== 'admin' && req.user.id !== review.userId) {
      return res.status(403).json({ message: 'Not allowed to edit this review' });
    }

    if (rating != null) {
      const newRating = Number(rating);
      if (newRating < 1 || newRating > 5) {
        return res.status(400).json({ message: 'rating must be between 1 and 5' });
      }
      review.rating = newRating;
    }

    if (comment != null) {
      review.comment = comment;
    }

    reviews[index] = review;
    await writeReviews(reviews);

    res.status(200).json({ message: 'Review updated', review });
  } catch (error) {
    console.error('Error editing review:', error);
    res.status(500).json({ message: 'Error editing review' });
  }
};

module.exports = {
  createReview,
  getReviewsForGym,
  deleteReview,
  editReview
};
