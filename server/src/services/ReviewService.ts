import { v4 as uuidv4 } from 'uuid';
import Review from '../entities/Review';
import ReviewRepository from '../repository/Review/ReviewRepository';
import UserService from './UserService';

class ReviewService {
  private repository: ReviewRepository;
  private userService: UserService;

  constructor(userService: UserService) {
    this.repository = new ReviewRepository();
    this.userService = userService;
  }

  createReview(userId: string, stars: number, description: string) {
    const reviewId = uuidv4();

    const newReview = new Review(reviewId, userId, stars, description);
    delete newReview.user;
    this.repository.add(newReview);
    return { insertedId: reviewId, ...newReview };
  }

  getAllReviews() {
    const rawReviews = this.repository.getAll();

    return rawReviews.map(rawReview => {
      const { createdAt, description, id, stars, userId } = rawReview;
      const user = this.userService.getUserById(userId);
      const review = new Review(id, userId, stars, description, createdAt);
      review.setUser(user);
      return review;
    });
  }

  getReviewById(id: string) {
    const rawReview = this.repository.findOne(id);
    if (rawReview) {
      const { createdAt, description, id, stars, userId } = rawReview;
      const user = this.userService.getUserById(userId);
      const review = new Review(id, userId, stars, description, createdAt);
      review.setUser(user);
      return review;
    }

    return rawReview;
  }

  updateReview(id: string, updatedData: Partial<Review>) {
    const rawUpdatedReview = this.repository.updateOne(id, updatedData);

    if (rawUpdatedReview) {
      const { createdAt, description, id, stars, userId } = rawUpdatedReview;
      const review = new Review(id, userId, stars, description, createdAt);
      const user = this.userService.getUserById(userId);
      review.setUser(user);
      return review;
    }

    return rawUpdatedReview;
  }

  deleteReview(id: string) {
    return this.repository.deleteOne(id);
  }

  getReviewsPaginated(page: number, pageSize: number) {
    const reviews = this.getAllReviews();

    reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedReviews = reviews.slice(startIndex, endIndex);

    const hasMore = endIndex < reviews.length;

    return { reviews: paginatedReviews, hasMore };
  }

  calculateAverageStars() {
    const reviews = this.getAllReviews();

    if (reviews.length === 0) {
      return 0;
    }

    const totalStars = reviews.reduce((accumulator, review) => {
      return accumulator + review.stars;
    }, 0);

    const averageStars = totalStars / reviews.length;

    const averageStarsRounded = parseFloat(averageStars.toFixed(1));

    return { averageStars: averageStarsRounded, count: reviews.length };
  }
}

export default ReviewService;
