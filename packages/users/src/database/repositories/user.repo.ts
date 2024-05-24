import CustomError from "@users/errors/custom-erorrs";
import { IUser, UserModel } from "../models/user.model";
import { UserUpdate } from "./@types/user.types";
import { StatusCode } from "@users/utils/consts";
import APIError from "@users/errors/api-error";
import { logger } from "@users/utils/logger";
import mongoose from "mongoose";

export class UserRepository {
  async createUser(userData: IUser) {
    try {
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        throw new CustomError("Email already exist", StatusCode.Found);
      }
      //new user and create user
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async FindUserById({ id }: { id: string }) {
    try {
      const existingUser = await UserModel.findOne({ id: id });
      return existingUser;
    } catch (error) {
      throw new APIError("Cannot Find User in Database");
    }
  }

  async UpdateUserbyId({ id, update }: { id: string; update: UserUpdate }) {
    try {
      const isExist = await this.FindUserById({ id });
      if (!isExist) {
        throw new CustomError("user is not found", StatusCode.NotFound);
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }
      const newUpdateUser = await UserModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      return newUpdateUser;
    } catch (error: any) {
      logger.error(
        `UserService UserRepository UpdateUserById() method error: ${error}`
      );
      throw Error(error);
    }
  }

  async deleteUser({ id }: { id: string }) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw new CustomError("Cannot Find user in Database");
    }
  }

  // Additional methods to handle other operations
}
