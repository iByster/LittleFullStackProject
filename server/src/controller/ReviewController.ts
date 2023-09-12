import { Request, Response } from 'express';
import ReviewService from '../services/ReviewService';
import UserService from '../services/UserService';

class ReviewController {
  private reviewService: ReviewService;
  private userService: UserService;

  constructor(reviewService: ReviewService, userService: UserService) {
    this.reviewService = reviewService;
    this.userService = userService;
  }

  createReview(req: Request, res: Response) {
    const { name, stars, description } = req.body;
    const { insertedId: userId } = this.userService.createUser(name, null);
    const review = this.reviewService.createReview(userId, stars, description);
    res.status(201);
    res.json(review);
  }

  getAllReviews(_: Request, res: Response) {
    const reviews = this.reviewService.getAllReviews();
    res.json(reviews);
  }

  getReviewById(req: Request, res: Response) {
    const { id } = req.params;
    const review = this.reviewService.getReviewById(id);
    if (review) {
      res.json(review);
    } else {
      res.sendStatus(404);
    }
  }

  updateReview(req: Request, res: Response) {
    const { id } = req.params;
    const { stars, description, name } = req.body;

    if (name) {
      const review = this.reviewService.getReviewById(id);

      if (review) {
        this.userService.updateUser(review.userId, { name });
      }
    }

    const updatedData = { stars, description };
    const updated = this.reviewService.updateReview(id, updatedData);
    if (updated) {
      res.json(updated);
      res.status(204);
    } else {
      res.sendStatus(404);
    }
  }

  deleteReview(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = this.reviewService.deleteReview(id);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }

  calculateAverageStars(_: Request, res: Response) {
    const averageStars = this.reviewService.calculateAverageStars();
    res.json(averageStars);
  }

  getPaginatedReviews(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 3;
    const reviews = this.reviewService.getReviewsPaginated(page, pageSize);
    res.json(reviews);
  }
}

export default ReviewController;
