import React, { createContext, useContext, useState } from 'react';
import Review from '../entities/Review';

const ReviewContext = createContext<any>({
    newReview: null,
});

export const useReviewContext = () => {
  return useContext(ReviewContext);
};

interface IProps {
    children: React.ReactNode;
}

export const ReviewContextProvider: React.FC<IProps> = ({ children }) => {
  const [newReview, setNewReview] = useState<Review | null>(null);

  const saveNewReview = (review: Review) => {
    setNewReview(review);
  };

  return (
    <ReviewContext.Provider value={{ newReview, saveNewReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
