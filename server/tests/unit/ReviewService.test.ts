// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { expect } from 'chai';
// import sinon, { SinonStub } from 'sinon';
// import * as mocha from 'mocha';
// import ReviewService from '../../src/services/ReviewService';
// import ReviewRepository from '../../src/repository/Review/ReviewRepository';
// import User from '../../src/entities/User';
// import Review from '../../src/entities/Review';

// describe('ReviewService', () => {
//   let reviewService: ReviewService;
//   let userServiceStub: { getUserById: SinonStub };
//   let reviewRepositoryMock: ReviewRepository;

//   beforeEach(() => {
//     userServiceStub = {
//       getUserById: sinon
//         .stub()
//         .returns(new User('user1', 'User One', 'user1.jpg')),
//     };
//     reviewRepositoryMock = sinon.createStubInstance(ReviewRepository); // Create a mock repository

//     reviewService = new ReviewService(
//       userServiceStub as any,
//       reviewRepositoryMock as any
//     ); // Inject the mock repository
//   });

//   describe('createReview', () => {
//     it('should create a new review', () => {
//       const review = reviewService.createReview('user123', 5, 'Great review');

//       expect(review).to.have.property('insertedId');
//       expect(review).to.have.property('userId', 'user123');
//       expect(review).to.have.property('stars', 5);
//       expect(review).to.have.property('description', 'Great review');
//     });
//   });

//   describe('getAllReviews', () => {
//     it('should return an array of reviews with user data', () => {
//       const reviews = reviewService.getAllReviews();

//       expect(reviews).to.be.an('array');
//       expect(reviews.length).to.be.greaterThan(0);
//       expect(userServiceStub.getUserById.called).to.be.true; // Ensure getUserById was called

//       // Add more assertions as needed
//     });
//   });

//   describe('getReviewById', () => {
//     it('should return a review with user data by ID', () => {
//       const reviewId = 'review123';
//       const review = reviewService.getReviewById(reviewId);

//       expect(review).to.be.an('object');
//       expect(review.id).to.equal(reviewId);
//       expect(userServiceStub.getUserById.called).to.be.true; // Ensure getUserById was called

//       // Add more assertions as needed
//     });

//     it('should return null if a review is not found', () => {
//       const reviewId = 'nonExistentReview';
//       const review = reviewService.getReviewById(reviewId);

//       expect(review).to.be.null;
//     });
//   });

//   describe('updateReview', () => {
//     it('should update a review by ID', () => {
//       const reviewId = 'review123';
//       const updatedData = { stars: 4 };
//       const updatedReview = reviewService.updateReview(reviewId, updatedData);

//       expect(updatedReview).to.be.an('object');
//       expect(updatedReview.id).to.equal(reviewId);
//       expect(updatedReview.stars).to.equal(updatedData.stars);

//       // Add more assertions as needed
//     });

//     it('should return false if a review is not found', () => {
//       const reviewId = 'nonExistentReview';
//       const updatedData = { stars: 4 };
//       reviewRepositoryMock.findOne.returns(null);
//       const result = reviewService.updateReview(reviewId, updatedData);

//       expect(result).to.be.false;
//     });
//   });

//   describe('deleteReview', () => {
//     it('should delete a review by ID', () => {
//       const reviewId = 'review123';
//       reviewRepositoryMock.findOne.returns(
//         new Review(reviewId, 'user123', 5, 'Great review')
//       );
//       const result = reviewService.deleteReview(reviewId);

//       expect(result).to.be.true;
//       expect(userServiceStub.getUserById.called).to.be.true; // Ensure getUserById was called

//       // Verify that the review is deleted
//       const deletedReview = reviewService.getReviewById(reviewId);
//       expect(deletedReview).to.be.null;
//     });

//     it('should return false if a review is not found', () => {
//       const reviewId = 'nonExistentReview';
//       reviewRepositoryMock.findOne.returns(null);
//       const result = reviewService.deleteReview(reviewId);

//       expect(result).to.be.false;
//     });
//   });

//   describe('getReviewsPaginated', () => {
//     it('should return a paginated list of reviews with user data', () => {
//       const page = 1;
//       const pageSize = 10;
//       const paginatedReviews = reviewService.getReviewsPaginated(
//         page,
//         pageSize
//       );

//       expect(paginatedReviews).to.be.an('array');
//       expect(userServiceStub.getUserById.called).to.be.true; // Ensure getUserById was called

//       // Add more assertions as needed
//     });
//   });

//   describe('calculateAverageStars', () => {
//     it('should calculate the average stars for all reviews', () => {
//       // Create sample reviews with different star ratings
//       const reviews = [
//         new Review('review1', 'user1', 5, 'Great review'),
//         new Review('review2', 'user2', 4, 'Good review'),
//         new Review('review3', 'user3', 3, 'Average review'),
//       ];

//       reviewRepositoryMock.getAll.returns(reviews);

//       const averageStars = reviewService.calculateAverageStars();

//       expect(averageStars).to.be.a('number');
//       // Calculate the expected average manually
//       const expectedAverage = (5 + 4 + 3) / 3;

//       expect(averageStars).to.equal(expectedAverage);
//     });

//     it('should return 0 if there are no reviews', () => {
//       reviewRepositoryMock.getAll.returns([]);
//       const averageStars = reviewService.calculateAverageStars();

//       expect(averageStars).to.equal(0);
//     });
//   });
// });
