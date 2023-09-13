import User from '../../entities/User';
import path from 'path';
import Repository from '../common/Repository';

class UserRepository extends Repository<User> {
  constructor(filePath?: string) {
    super(filePath || path.join(__dirname, 'users.json'));
  }
}

export default UserRepository;
