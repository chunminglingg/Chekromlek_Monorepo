import { IUser } from '@users/database/models/user.model';
import { UserRepository } from '@users/database/repositories/user.repo';
import { logger } from '@users/utils/logger';
import mongoose from 'mongoose';

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
  async getUserById(id: string) {
    try {
      return await this.userRepo.FindUserById(id);
    } catch (error) {
      logger.error('Get user error:', error);
      throw error;
    }
  }
  async toggleFavoritePost(userId: string, postId: string) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new Error('Invalid post ID format');
    }
    const objectId = new mongoose.Types.ObjectId(postId);

    const user = await this.userRepo.FindUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const existingFavoriteIndex = user.saves.findIndex((item) =>
      item.equals(objectId),
    );

    if (existingFavoriteIndex !== -1) {
      // Remove post from favorites
      user.saves.splice(existingFavoriteIndex, 1);
      await user.save();
      return {
        message: 'Post removed from favorites successfully',
        data: user,
      };
    }

    // Add post to favorites
    user.saves.push(objectId);
    await user.save();
    return {
      message: 'Post added to favorites successfully',
      data: user,
    };
  }
}
