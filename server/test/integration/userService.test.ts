import chai from 'chai';
import { describe, before, it, after } from 'mocha';
import fs from 'fs';
import path from 'path';
import UserService from '../../src/services/UserService';
const expect = chai.expect;

describe('UserService Integration Tests', function () {
  let userService: UserService;
  const testRepoPath = path.join(__dirname, 'users.test.json');

  before(function () {
    fs.writeFileSync(testRepoPath, JSON.stringify([]), { encoding: 'utf-8' });
    userService = new UserService(testRepoPath);
  });

  after(function () {
    fs.unlinkSync(testRepoPath);
  });

  it('should create a new user', function () {
    const newUser = userService.createUser('John Doe', 'user.jpg');

    expect(newUser).to.have.property('id');
    expect(newUser.name).to.equal('John Doe');
    expect(newUser.image).to.equal('user.jpg');
  });

  it('should get all users', function () {
    const users = userService.getAllUsers();

    expect(users).to.be.an('array');
  });

  it('should get a user by ID', function () {
    const newUser = userService.createUser('Alice', 'alice.jpg');
    const retrievedUser = userService.getUserById(newUser.id);

    expect(retrievedUser).to.deep.equal(newUser);
  });

  it('should update a user', function () {
    const newUser = userService.createUser('Bob', 'bob.jpg');
    const updatedData = { name: 'Updated Bob' };
    const updatedUser = userService.updateUser(newUser.id, updatedData);

    expect(updatedUser).to.have.property('id', newUser.id);
    if (updatedUser) {
      expect(updatedUser.name).to.equal('Updated Bob');
    }
  });

  it('should delete a user', function () {
    const newUser = userService.createUser('Eve', 'eve.jpg');
    const deleted = userService.deleteUser(newUser.id);

    expect(deleted).to.be.true;
    const retrievedUser = userService.getUserById(newUser.id);
    expect(retrievedUser).to.be.null;
  });
});
