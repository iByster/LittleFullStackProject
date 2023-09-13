import chai from 'chai';
import { describe, before, it } from 'mocha';
import fs from 'fs';
import path from 'path';
import UserService from '../../src/services/UserService';
import ReviewService from '../../src/services/ReviewService';
const expect = chai.expect;

describe('ReviewService Integration Tests', function () {
  let reviewService: ReviewService;
  const testUserRepoPath = path.join(__dirname, 'users.test.json');
  const testReviewRepoPath = path.join(__dirname, 'reviews.test.json');

  before(function () {
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
});
