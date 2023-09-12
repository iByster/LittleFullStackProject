import { Nullable } from '../types';
import User from './User';

class Review {
  id!: string;
  userId!: string;
  stars: number;
  description: Nullable<string>;
  user?: User | null = null;
  createdAt: Date;

  constructor(
    id: string,
    userId: string,
    stars: number,
    description: Nullable<string>,
    createdAt?: Date | string
  ) {
    this.id = id;
    this.userId = userId;
    this.stars = stars;
    this.description = description;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }

  setUser(user: User | null) {
    this.user = user;
  }
}

export default Review;
