import { IUser } from '@users/database/models/user.model';
import { UserRepository } from '@users/database/repositories/user.repo';
import APIError from '@users/errors/api-error';
import { StatusCode } from '@users/utils/consts';
import { logger } from '@users/utils/logger';

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
  async CreateUser(user: IUser & { userId: string }) {
    try {
      const newUser = await this.userRepo.createUser(user);
      return newUser;
    } catch (error) {
      logger.error(`Create() method error: ${error}`);
      throw error;
    }
  }
  async UpdateById(userId: string, update: IUser) {
    try {
      const users = this.userRepo.FindUserById(userId);
      console.log('user', users);
      if (!users) {
        throw new APIError('User not found', StatusCode.NotFound);
      }
      return await this.userRepo.UpdateUserById(userId, update);
    } catch (error) {
      logger.error('Update error: ', error);
      throw error;
    }
  }

  async updateUserProfile(userId: string, update: IUser) {
    try {
      const users = this.userRepo.FindAuthById(userId);
      console.log('user', users);
      if (!users) {
        throw new APIError('User not found', StatusCode.NotFound);
      }
      return await this.userRepo.UpdateUserById(userId, update);
    } catch (error) {
      logger.error('Update error: ', error);
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
  async updateUserPosts(userId: string, postId: string) {
    return this.userRepo.updateUserPosts(userId, postId);
  }

  async getAuthById(userId: string) {
    try {
      return await this.userRepo.FindAuthById(userId);
    } catch (error) {
      logger.error('Get Auth Error:', error);
      throw error;
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
