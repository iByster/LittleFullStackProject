import chai from 'chai';
import { describe, beforeEach, it } from 'mocha';
import fs from 'fs';
import path from 'path';
import UserService from '../../src/services/UserService';
import ReviewService from '../../src/services/ReviewService';
import { delay } from '../../src/utils/utils';
const expect = chai.expect;

describe('ReviewService Integration Tests', function () {
  let reviewService: ReviewService;
  const testUserRepoPath = path.join(__dirname, 'users.test.json');
  const testReviewRepoPath = path.join(__dirname, 'reviews.test.json');

  beforeEach(function () {
    fs.writeFileSync(testUserRepoPath, JSON.stringify([]), {
      encoding: 'utf-8',
    });
    const userService = new UserService(testUserRepoPath);
    fs.writeFileSync(testReviewRepoPath, JSON.stringify([]), {
      encoding: 'utf-8',
    });
    reviewService = new ReviewService(userService, testReviewRepoPath);
  });

  after(function () {
    fs.unlinkSync(testUserRepoPath);
    fs.unlinkSync(testReviewRepoPath);
  });

  it('should create a new review', function () {
    const userId = 'testUserId';
    const newReview = reviewService.createReview(
      userId,
      4,
      'Test Review Description'
    );

    expect(newReview).to.have.property('id');
    expect(newReview.stars).to.equal(4);
    expect(newReview.description).to.equal('Test Review Description');
  });

  it('should get all reviews', function () {
    const reviews = reviewService.getAllReviews();

    expect(reviews).to.be.an('array');
  });

  it('should get a review by ID', function () {
    const userId = 'testUserId';
    const newReview = reviewService.createReview(userId, 5, 'Another Review');
    const retrievedReview = reviewService.getReviewById(newReview.id);
    delete retrievedReview?.user;

    expect(retrievedReview).to.deep.equal(newReview);
  });

  it('should update a review', function () {
    const userId = 'testUserId';
    const newReview = reviewService.createReview(userId, 3, 'Old Review');
    const updatedData = { stars: 4, description: 'Updated Review' };
    const updatedReview = reviewService.updateReview(newReview.id, updatedData);

    expect(updatedReview).to.have.property('id', newReview.id);
    if (updatedReview) {
      expect(updatedReview.stars).to.equal(4);
      expect(updatedReview.description).to.equal('Updated Review');
    }
  });

  it('should delete a review', function () {
    const userId = 'testUserId';
    const newReview = reviewService.createReview(userId, 2, 'Delete Me');
    const deleted = reviewService.deleteReview(newReview.id);

    expect(deleted).to.be.true;
    const retrievedReview = reviewService.getReviewById(newReview.id);
    expect(retrievedReview).to.be.undefined;
  });

  it('should handle getting a non-existent review by ID', function () {
    const nonExistentReview = reviewService.getReviewById('nonExistentId');
    expect(nonExistentReview).to.be.undefined;
  });

  it('should handle updating a non-existent review', function () {
    const updatedData = { stars: 4, description: 'Updated Review' };
    const updatedReview = reviewService.updateReview(
      'nonExistentId',
      updatedData
    );
    expect(updatedReview).to.be.false;
  });

  it('should handle deleting a non-existent review', function () {
    const deleted = reviewService.deleteReview('nonExistentId');
    expect(deleted).to.be.false;
  });

  it('should get reviews in descending order of creation', async function () {
    const userId = 'testUserId';
    reviewService.createReview(userId, 4, 'Review 1');
    await delay(500);
    reviewService.createReview(userId, 3, 'Review 2');
    await delay(500);
    reviewService.createReview(userId, 5, 'Review 3');
    await delay(500);

    const reviews = reviewService.getAllReviews();

    expect(reviews[0].description).to.equal('Review 3');
    expect(reviews[1].description).to.equal('Review 2');
    expect(reviews[2].description).to.equal('Review 1');
  });

  it('should calculate the average stars correctly', function () {
    const userId = 'testUserId';
    reviewService.createReview(userId, 4, 'Review 1');
    reviewService.createReview(userId, 3, 'Review 2');
    reviewService.createReview(userId, 5, 'Review 3');

    const averageStars = reviewService.calculateAverageStars();

    expect(averageStars).to.have.property('averageStars', 4.0);
    expect(averageStars).to.have.property('count', 3);
  });

  it('should return paginated reviews', function () {
    const userId = 'testUserId';
    const reviews = [];
    for (let i = 0; i < 10; i++) {
      reviews.push(
        reviewService.createReview(userId, i + 1, `Review ${i + 1}`)
      );
    }

    const pageSize = 5;
    const page1Reviews = reviewService.getReviewsPaginated(1, pageSize);
    const page2Reviews = reviewService.getReviewsPaginated(2, pageSize);

    expect(page1Reviews.reviews).to.have.lengthOf(pageSize);
    expect(page1Reviews.hasMore).to.be.true;

    expect(page2Reviews.reviews).to.have.lengthOf(pageSize);
    expect(page2Reviews.hasMore).to.be.false;
  });
});
