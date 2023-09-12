import Review from '../../entities/Review';
import path from 'path';
import Repository from '../common/Repository';

class ReviewRepository extends Repository<Review> {
  constructor() {
    super(path.join(__dirname, 'reviews.json'));
  }
}

export default ReviewRepository;
