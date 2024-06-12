import VerificationModel from "../database/models/verification-request.model";
import { UserAuthRpository } from "../database/repositories/auth-user.repo";
import CustomError from "../errors/custom-erorrs";
import { StatusCode } from "../utils/consts";
import { generatePassword, validationPassword } from "../utils/jwt";
import { generateEmailVerificationToken } from "../utils/verification-token";
// import { VerificationService } from "./verification.service";
import { UserSignInSchemaType } from "../schemas/@types/auth.types";
import { VerificationRepository } from "../database/repositories/verification-request.repo";
import APIError from "../errors/api-error";
import { logger } from "../utils/logger";
import { publishDirectMessage } from "../queues/auth-producer";
import { authChannel } from "../utils/server";
import { UserSignInResult } from "./@types/auth-user.types";
import DuplicateError from "../errors/duplicate-error";
import mongoose from "mongoose";
import axios from "axios";

export class UserAuthService {
  private userRepo: UserAuthRpository;
  private verificationRepo: VerificationRepository;
  constructor() {
    this.userRepo = new UserAuthRpository();
    // this.verification = new VerificationService();
    this.verificationRepo = new VerificationRepository();
  }
  async SignUp(user: UserSignInResult) {
    try {
      const hashedPassword =
        user.password && (await generatePassword(user.password));
      let newUserAuth = { ...user };
      if (hashedPassword) {
        newUserAuth = { ...newUserAuth, password: hashedPassword };
      }
      const existingUser = await this.userRepo.FindUser({
        email: user.email ?? "",
      });

      if (existingUser) {
        if (!existingUser.isVerified) {
          throw new DuplicateError(
            "That email already signed up. Please verify!!"
          );
        }
        throw new DuplicateError("You can't sign up with that email!!");
      }

      const savedUser = await this.userRepo.createAuthUser(newUserAuth);
      return savedUser;
    } catch (error: unknown) {
      if (error instanceof DuplicateError) {
        const existedUser = await this.userRepo.FindUser({
          email: user.email as string,
        });
        if (!existedUser?.isVerified) {
          const token = await this.verificationRepo.FindVerificationTokenById({
            id: existedUser!._id.toString(),
          });

          if (!token) {
            logger.error(`UserService Create() method error: token not found!`);
            throw new APIError(
              `Something went wrong!`,
              StatusCode.InternalServerError
            );
          }
          const messageDetails = {
            receiverEmail: existedUser!.email,
            verifyLink: `${token.token}`,
            template: "verifyEmail",
          };

          await publishDirectMessage(
            authChannel,
            "email-notification",
            "auth-email",
            JSON.stringify(messageDetails),
            "Verify email message has been sent to notification service"
          );
          throw new APIError(
            "A user with this email already exists. Verification email resent.",
            StatusCode.Conflict
          );
        } else {
          throw new APIError(
            "A user with this email already exists. Please login.",
            StatusCode.Conflict
          );
        }
      }
      throw error;
    }
  }

  async SendEmailToken({ userId }: { userId: string }) {
    try {
      const timestamp = new Date();

      const emailVerificationToken = generateEmailVerificationToken();
      const verification = new VerificationModel({
        userId,
        token: emailVerificationToken,
        expiredDate: timestamp,
      });
      const existedUser = await this.userRepo.FindUserById({ id: userId });
      if (!existedUser) {
        throw new CustomError("User does not exist!", StatusCode.NotFound);
      }
      return await verification.save();
    } catch (error: unknown) {
      throw error;
    }
  }

  // TODO:
  // 1. find token is the token exist or not
  // 2. find user is the user exist or not
  // 3. If the user exist then mark the user to true
  // 4. save user in database
  // 5. delete the token from database

  async VerifyEmailToken({ token }: { token: string }) {
    try {
      const exitedToken =
        await this.verificationRepo.FindAccountVerificationToken({ token });

      // Check if the token is invalid
      if (!exitedToken) {
        logger.error(`Verification token is invalid: ${token}`);
        throw new APIError(
          "Verification token is invalid",
          StatusCode.BadRequest
        );
      }

      const user = await this.userRepo.FindUserById({
        id: exitedToken.userId.toString(),
      });

      if (!user) {
        logger.error(`User does not exist for token: ${token}`);
        throw new APIError("User does not exist.", StatusCode.NotFound);
      }

      // Change the verify status to true
      user.isVerified = true;
      await user.save();

      // After verify success, delete the token
      await this.verificationRepo.deleteAccountVerificationToken({ token });

      return user;
    } catch (error: unknown) {
      logger.error(`Error in VerifyEmailToken service method: ${error}`);
      throw error;
    }
  }

  async Login(userDetail: UserSignInSchemaType) {
    const auth = await this.userRepo.FindUser({ email: userDetail.email });
    if (!auth) {
      throw new CustomError("User not exist", StatusCode.NotFound);
    }
    if (!auth.isVerified) {
      throw new CustomError(
        "Email not verified, please verify your email address",
        StatusCode.BadRequest
      );
    }
    const isPwdCorrect = await validationPassword({
      enterPassword: userDetail.password,
      savedPassword: auth.password as string,
    });
    if (!isPwdCorrect) {
      throw new CustomError(
        "The email or password you entered is incorrect. Please double-check and try again.",
        StatusCode.BadRequest
      );
    }
    return auth;
  }
  async FindUserByEmail({ email }: { email: string }) {
    try {
      const user = await this.userRepo.FindUser({ email });
      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
  async UpdateUser({ id, update }: { id: string; update: object }) {
    try {
      const user = await this.userRepo.FindUserById({ id });
      if (!user) {
        throw new APIError("User does not exist", StatusCode.NotFound);
      }
      const updatedUser = await this.userRepo.UpdateUserbyId({ id, update });
      return updatedUser;
    } catch (error: unknown) {
      throw error;
    }
  }
  async saveForgotPasswordToken({ id }: { id: mongoose.Types.ObjectId }) {
    try {
      const user = await this.userRepo.FindUserById({ id: id.toString() });

      user!.resetPasswordToken = await generateEmailVerificationToken();
      user!.resetPasswordExpires = new Date(
        new Date().getTime() + 1 * 60 * 1000
      ); // Adding 2 minutes
      await user?.save();

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
  async FindUserByResetToken({ token }: { token: string }) {
    try {
      const user = await this.userRepo.findUserByResetToken({
        resetToken: token,
      });

      if (!user) {
        throw new APIError("User not found", StatusCode.NotFound);
      }

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
  async resetPassword({
    token,
    password,
  }: {
    token: string;
    password: string;
  }) {
    try {
      const user = await this.userRepo.findUserByResetToken({
        resetToken: token,
      });

      if (!user) {
        throw new APIError("User not found", StatusCode.NotFound);
      }

      if (new Date() > user.resetPasswordExpires!) {
        throw new APIError("Token is expired", StatusCode.BadRequest);
      }

      const hashPass = await generatePassword(password!);
      user!.password = hashPass;
      user!.resetPasswordToken = undefined;
      user!.resetPasswordExpires = undefined;
      await user?.save();

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
  async logout(decodedUser: any) {
    try {
      const { authId } = decodedUser;
      console.log("id from service: ", authId);
      const existedUser = await axios.get(
        `http://localhost:4000/v1/users/${authId}`
      );
      if (!existedUser) {
        throw new APIError("No user found!", StatusCode.NotFound);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
