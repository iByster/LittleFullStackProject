import { v4 as uuidv4 } from 'uuid';
import User from '../entities/User';
import { Nullable } from '../types';
import UserRepository from '../repository/User/UserRepository';

class UserService {
  private repository: UserRepository;

  constructor(filePath?: string) {
    this.repository = new UserRepository(filePath);
  }

  createUser(name: Nullable<string>, image: Nullable<string>) {
    const userId = uuidv4();

    const newUser = new User(userId, name, image);
    this.repository.add(newUser);
    return { ...newUser };
  }

  getAllUsers() {
    const rawUsers = this.repository.getAll();

    return rawUsers.map(user => {
      const { id, image, name } = user;
      return new User(id, name, image);
    });
  }

  getUserById(id: string) {
    const rawUser = this.repository.findOne(id);

    if (rawUser) {
      const { id, image, name } = rawUser;
      return new User(id, name, image);
    }

    return null;
  }

  updateUser(id: string, updatedData: Partial<User>) {
    const rawNewUser = this.repository.updateOne(id, updatedData);

    if (rawNewUser) {
      const { id, image, name } = rawNewUser;
      return new User(id, name, image);
    }

    return false;
  }

  deleteUser(id: string) {
    return this.repository.deleteOne(id);
  }
}

export default UserService;
