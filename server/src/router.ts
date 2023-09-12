import express from 'express';
import UserService from './services/UserService';
import ReviewService from './services/ReviewService';
import ReviewController from './controller/ReviewController';

const reviewRouter = express.Router();
const userService = new UserService();
const reviewService = new ReviewService(userService);

const reviewController = new ReviewController(reviewService, userService);

reviewRouter.post(
  '/reviews',
  reviewController.createReview.bind(reviewController)
);
reviewRouter.get(
  '/reviews',
  reviewController.getAllReviews.bind(reviewController)
);
reviewRouter.get(
  '/reviews/:id',
  reviewController.getReviewById.bind(reviewController)
);
reviewRouter.put(
  '/reviews/:id',
  reviewController.updateReview.bind(reviewController)
);
reviewRouter.delete(
  '/reviews/:id',
  reviewController.deleteReview.bind(reviewController)
);
reviewRouter.get(
  '/averageStars',
  reviewController.calculateAverageStars.bind(reviewController)
);
reviewRouter.get(
  '/paginatedReviews',
  reviewController.getPaginatedReviews.bind(reviewController)
);

export default reviewRouter;
