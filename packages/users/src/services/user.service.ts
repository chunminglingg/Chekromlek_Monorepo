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
  async CreateUser(user: IUser & { authId: string }) {
    try {
      const newUser = await this.userRepo.createUser(user);
      return newUser;
    } catch (error) {
      logger.error(`Create() method error: ${error}`);
      throw error;
    }
  }
  async UpdateById(authId: string, update: IUser) {
    try {
      const users = this.userRepo.FindUserById(authId);
      console.log('user', users);
      if (!users) {
        throw new APIError('User not found', StatusCode.NotFound);
      }
      return await this.userRepo.UpdateUserById(authId, update);
    } catch (error) {
      logger.error('Update error: ', error);
      throw error;
    }
  }
  
  async updateUserProfile(authId: string, update: IUser) {
    try {
      const users = this.userRepo.FindAuthById(authId);
      console.log('user', users);
      if (!users) {
        throw new APIError('User not found', StatusCode.NotFound);
      }
      return await this.userRepo.UpdateUserById(authId, update);
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

  async getAuthById(authId: string) {
    try {
      return await this.userRepo.FindAuthById(authId);
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

  

  // async getUserProfile(id: string){
  //   try {
  //     return await this.userRepo.FindUserProfile(id);
  //   } catch (error) {
  //     logger.error('Get user error:', error);
  //     throw error;
  //   }
  // }
}
