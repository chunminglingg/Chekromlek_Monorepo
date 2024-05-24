import CustomError from "../../errors/custom-erorrs";
import { StatusCode } from "../../utils/consts";
import { UserAuthModel } from "../models/authentication-user.models";
import {
  AuthCreateUserRepository,
  AuthUpdateUserRepository,
  UserSignUp,
} from "./@types/auth-user.types";

export class UserAuthRpository {
  // Create User Account
  async createAuthUser(user: UserSignUp) {
    try {
      const newAuthUser = new UserAuthModel(user);
      return await newAuthUser.save();
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw Error;
      }
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }
  // Find User Account
  async FindUser({ email }: { email: string }) {
    try {
      const existingUser = await UserAuthModel.findOne({ email: email });
      return existingUser;
    } catch (error: any) {
      throw new Error("error is not found");
    }
  }
  async FindUserById({ id }: { id: string }) {
    try {
      const existingUser = await UserAuthModel.findById(id);
      return existingUser;
    } catch (error) {
      throw new CustomError("user is not found", StatusCode.NotFound);
    }
  }
  async UpdateUserbyId({
    id,
    update,
  }: {
    id: string;
    update: AuthUpdateUserRepository;
  }) {
    try {
      const isExist = await this.FindUserById({ id });
      if (!isExist) {
        throw new CustomError("User does not exist", StatusCode.NotFound);
      }
      const existingUser = await UserAuthModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      return existingUser;
    } catch (error: any) {
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }
  async checkUniqueUsername(username: string) {
    try {
      // Replace 'UserAuthModel' with your actual Mongoose model name
      const existingUser = await UserAuthModel.findOne({ username });
      return !existingUser;
    } catch (error: any) {
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }
  // }
  // async findUserByUsernameOrEmail(
  //   usernameOrEmail: string
  // ): Promise<userAuthTypes | null> {
  //   // Search for a user by username or email
  //   const user = await UserAuthModel.findOne({
  //     $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  //   });

  //   return user;
  // }
  async CreateOauthUser({
    username,
    email,
    googleId,
    isVerified,
    profile,
  }: AuthCreateUserRepository) {
    try {
      const user = new UserAuthModel({
        username: username,
        email: email,
        isVerified: isVerified,
        googleId: googleId,
        profile: profile,
      });
      const userResult = await user.save();
      if (!user) {
        throw new CustomError("Unable to create user into Database!");
      }
      return userResult;
    } catch (error) {
      throw error;
    }
  }
}
