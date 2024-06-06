import { IUser } from '@users/database/models/user.model';
import { UserRepository } from '@users/database/repositories/user.repo';
import { logger } from '@users/utils/logger';
import axios from 'axios';

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
  async CreateUser(user: IUser & { authId: string }) {
    try {
      const newUser = await this.userRepo.createUser(user);
      return newUser;
    } catch (error) {
      logger.error(`Create() method error: ${error}`);
      throw error;
    }
  }
  async UpdateById(id: string, update: IUser) {
    try {
      return await this.userRepo.UpdateUserById(id, update);
    } catch (error) {
      logger.error('Update error: ', error);
      throw error;
    }
  }
  async getAuthById(authId: string) {
    try {
      return await this.userRepo.FindAuthById(authId);
    } catch (error) {
      logger.error('Get Auth Error:', error);
      throw error;
    }
  }
  async showAllUser() {
    try {
      return await this.userRepo.showAllUser();
    } catch (error: unknown) {
      throw error;
    }
  }
  async getUserWithPosts(userId: string) {
    try {
      const user = await this.userRepo.FindUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Make an HTTP request to the Post Service
      const postsResponse = await axios.get(
        `http://localhost:3005/v1/post/${userId}/posts`,
      );
      user.posts = postsResponse.data;

      return user;
    } catch (error: any) {
      throw new Error(`Error fetching user with posts: ${error.message}`);
    }
  }
  async getUserById(id: string) {
    try {
      return await this.userRepo.FindUserById(id);
    } catch (error) {
      logger.error('Get user error:', error);
      throw error;
    }
  }
}
