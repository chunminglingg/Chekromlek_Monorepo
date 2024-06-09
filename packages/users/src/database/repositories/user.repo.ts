import CustomError from '@users/errors/custom-erorrs';
import { IUser, UserModel } from '../models/user.model';
import { StatusCode } from '@users/utils/consts';
import APIError from '@users/errors/api-error';
import { logger } from '@users/utils/logger';
import mongoose from 'mongoose';

export class UserRepository {
  async createUser(userData: IUser) {
    try {
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new CustomError('Email already exist', StatusCode.Found);
      }
      //new user and create user
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async FindUserById(userId: string) {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error: any) {
      logger.error(
        `UserService UserRepository FindUserById() method error: ${error.message}`,
      );
      throw new CustomError(
        'Error fetching user',
        StatusCode.InternalServerError,
      );
    }
  }
  async FindAuthById(authId: string) {
    try {
      const existingUser = await UserModel.findOne({ authId });
      return existingUser;
    } catch (error) {
      throw new APIError('Cannot Find User in Database');
    }
  }

  async UpdateUserById(id: string, update: IUser) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError('Invalid user ID', StatusCode.BadRequest);
      }

      const isExist = await this.FindUserById(id);
      if (!isExist) {
        throw new CustomError('User not found', StatusCode.NotFound);
      }

      const newUpdateUser = await UserModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      if (!newUpdateUser) {
        throw new CustomError(
          'Failed to update user',
          StatusCode.InternalServerError,
        );
      }

      return newUpdateUser;
    } catch (error: any) {
      logger.error(
        `UserService UserRepository UpdateUserById() method error: ${error.message}`,
      );
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        'Internal Server Error',
        StatusCode.InternalServerError,
      );
    }
  }

  async showAllUser() {
    try {
      return await UserModel.find();
    } catch (error: unknown) {
      throw error;
    }
  }
  async updateUserPosts(userId: string, postId: string) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { post: postId } },
      { new: true },
    );
  }

  async deleteUser({ id }: { id: string }) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw new CustomError('Cannot Find user in Database');
    }
  }
}
