import {
  Body,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
  Header,
  Get,
  Middlewares,
} from "tsoa";
import { StatusCode } from "../utils/consts";
import { UserAuthService } from "../services/auth-user.service";
import CustomError from "../errors/custom-erorrs";
import { generateSignature } from "../utils/jwt";
import validateInput from "../middlewares/validate-input";
import AuthUserSignInSchema, {
  AuthUserSignUpSchema,
} from "../schemas/auth-user.schemas";
import { publishDirectMessage } from "../queues/auth-producer";
import { logger } from "../utils/logger";
import APIError from "../errors/api-error";
import { IAuthUserMessageDetails } from "../queues/@types/auth.types";
import axios from "axios";
import { authChannel } from "../utils/server";
import dotenv from "dotenv";
import getConfig from "../utils/config";
import DuplicateError from "../errors/duplicate-error";
import { decodedToken } from "../utils/decodedToken";

dotenv.config();
interface LoginRequestBody {
  email: string;
  password: string;
}
interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface UserData {
  username: string;
  email: string;
}
@Route("v1/auth")
@Tags("Authentication")
export class UserAuthController {
  private userService: UserAuthService;
  constructor() {
    this.userService = new UserAuthService();
  }
  @SuccessResponse(StatusCode.Created, "Created")
  @Post("/signup")
  @Middlewares(validateInput(AuthUserSignUpSchema))
  public async SignUpUser(@Body() reqBody: SignUpRequestBody): Promise<any> {
    try {
      const { username, email, password } = reqBody;
      const newUser = await this.userService.SignUp({
        username,
        email,
        password,
      });

      const verificationToken = await this.userService.SendEmailToken({
        userId: newUser._id.toString(),
      });
      const messageDetails = {
        receiverEmail: newUser.email,
        verifyLink: `${verificationToken.token}`,
        template: "verifyEmail",
      };
      await publishDirectMessage(
        authChannel,
        "chekromlek-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Verify email message has been sent to notification service"
      );
      return {
        message: "Sign up successfully. Please verify your email.",
        data: newUser,
      };
    } catch (error: any) {
      if (error instanceof DuplicateError) {
        // Handle custom error
        return {
          message: error.message,
          statusCode: error.statusCode,
        };
      } else {
        return {
          message: error.message,
          statusCode: error.statusCode,
        };
      }
    }
  }
  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/verify")
  public async VerifyEmail(@Query() token: string): Promise<any> {
    try {
      // Verify the email token
      const user = await this.userService.VerifyEmailToken({ token });
      console.log("This is user:", user);

      const userDetail = await this.userService.FindUserByEmail({
        email: user.email! as string,
      });

      if (!userDetail) {
        logger.error(
          `AuthController VerifyEmail() method error: user not found`
        );
        throw new APIError(`User not found`, StatusCode.NotFound);
      }

     const userService = getConfig().user_service_url || "http://localhost:4000" ;

      // dev: localhost
      // docker: http://user-profile:4000...


      await axios.post(`${userService}/v1/users`, {
        userId: userDetail.id,
        username: userDetail.username,
        email: userDetail.email,
      });

      const messageDetails: IAuthUserMessageDetails = {
        username: userDetail.username,
        email: userDetail.email,
        type: "Auth",
      };

      // Publish message to the queue
      await publishDirectMessage(
        authChannel,
        "Chekromlek-user-update",
        "user-applier",
        JSON.stringify(messageDetails),
        "User details sent to user service"
      );

      // Generate JWT for the verified user
      const jwtToken = await generateSignature({
        userId: user._id,
        username: user.username,
      });

      console.log({
        message: "User verified email successfully",
        token: jwtToken,
      });
      return { message: "User verified email successfully", token: jwtToken };
    } catch (error) {
      logger.error(`Error verifying email token: ${error}`);

      // Ensure the response is always JSON
      if (error instanceof APIError) {
        throw error; // Or handle APIError specifically if needed
      } else {
        throw new APIError(
          "Internal Server Error",
          StatusCode.InternalServerError
        );
      }
    }
  }
  @SuccessResponse(StatusCode.OK, "OK")
  @Post("/login")
  @Middlewares(validateInput(AuthUserSignInSchema))
  public async LoginWithEmail(
    @Body() requestBody: LoginRequestBody
  ): Promise<any> {
    try {
      const { email, password } = requestBody;
      // Call the userService to perform the login operation
      const user = await this.userService.Login({ email, password });
      if (!user) {
        // Handle failed login with a specific error
        throw new CustomError(
          "email or password is incorrect",
          StatusCode.Unauthorized
        );
      }

      const token = await generateSignature({
        userId: user._id,
        username: user.username,
      });
      console.log("JWT", token);
      return {
        message: "Login Successfully",
        token: token,
      };
    } catch (error: any | unknown) {
      // Handle specific error types
      if (error instanceof CustomError) {
        throw error;
      } else {
        console.error("Unexpected error:", error.message);
        if (error.response) {
          console.error("Error response data:", error.response.data);
        }
        throw new CustomError("Login failed", StatusCode.InternalServerError);
      }
    }
  }

  //  Google Authentication
  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/google")
  public async GoogleAuth() {
    const config = getConfig();
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.client_id}&redirect_uri=${config.redirect_url}&response_type=code&scope=profile email`;
    return { url };
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/google/callback")
  public async GoogleAuthCallback(@Query() code: string) {
    try {
      const config = getConfig();
      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code,
        redirect_uri: config.redirect_url,
        grant_type: "authorization_code",
      });
      // Use access_token or id_token to fetch user profile
      const profile = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${data.access_token}` },
        }
      );

      if (!profile.data.email) {
        throw new Error("Email is missing from Google profile data");
      }
      const existingUser = await this.userService.FindUserByEmail({
        email: profile.data.email,
      });

      if (existingUser) {
        if (!existingUser.googleId) {
          await this.userService.UpdateUser({
            id: existingUser.id,
            update: { googleId: profile.data.id, isVerified: true },
          });
        }
        // Now, proceed to log the user in
        const jwtToken = await generateSignature({
          userId: existingUser._id,
        });
        return {
          token: jwtToken,
        };
      }

      const newUser = await this.userService.SignUp({
        username: profile.data.name,
        email: profile.data.email,
        googleId: profile.data._id,
        isVerified: true,
      });
      await newUser.save();
      const jwtToken = await generateSignature({
        userId: newUser._id,
      });
      return { token: jwtToken };
    } catch (error: any) {
      throw error;
    }
  }
  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/facebook")
  public async FacebookAuth(): Promise<{ url: string }> {
    try {
      const config = getConfig();
      const url = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${config.facebook_id}&redirect_uri=${config.facebook_url}`;
      return { url };
    } catch (error: unknown) {
      throw error;
    }
  }
  @SuccessResponse(StatusCode.OK, "OK")
  @Get("/facebook/callback")
  public async FacebookAuthCallback(
    @Query() code: string
  ): Promise<{ token: string }> {
    try {
      const config = getConfig();
      const { data } = await axios.get(
        `https://graph.facebook.com/v13.0/oauth/access_token`,
        {
          params: {
            client_id: config.facebook_id,
            client_secret: config.facebook_secret,
            code,
            redirect_uri: config.facebook_url,
          },
        }
      );

      const { access_token } = data;

      // Use access_token to fetch user profile
      const { data: profile } = await axios.get(
        `https://graph.facebook.com/v13.0/me`,
        {
          params: {
            fields: "name,picture",
            access_token,
          },
        }
      );

      const existingUser = await this.userService.FindUserByEmail({
        email: profile.email,
      });

      if (existingUser) {
        if (!existingUser.facebookId) {
          await this.userService.UpdateUser({
            id: existingUser.id,
            update: { facebookId: profile.id, isVerified: true },
          });
        }
        // Proceed to log the user in
        const jwtToken = await generateSignature({ userId: existingUser._id });
        return { token: jwtToken };
      }

      const newUser = await this.userService.SignUp({
        username: profile.name,
        profile: profile.picture.data.url,
        facebookId: profile.id,
        isVerified: true,
      });
      await newUser.save();
      const jwtToken = await generateSignature({ userId: newUser._id });
      return { token: jwtToken };
    } catch (error: any) {
      logger.error(`FacebookAuthCallback error: ${error.message}`);
      throw error;
    }
  }
  @Post("/forgot-password")
  @SuccessResponse(StatusCode.OK, "OK")
  async ForgotPassword(@Body() requestBody: { email: string }): Promise<any> {
    try {
      const { email } = requestBody;
      const user = await this.userService.FindUserByEmail({ email });
      if (!user) {
        throw new APIError("User not found", StatusCode.NotFound);
      }
      const token = await this.userService.saveForgotPasswordToken({
        id: user._id,
      });
      const messageDetails = {
        username: user.username,
        receiverEmail: user.email,
        verifyLink: `${token?.resetPasswordToken}`,
        template: "forgotPassword",
      };
      await publishDirectMessage(
        authChannel,
        "chekromlek-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Reset password message has been sent to notification service"
      );
      return {
        message: "Forgot password token has been sent to your email.",
        data: email,
      };
    } catch (error) {
      throw new APIError(
        "An error occurred during forgot password",
        StatusCode.InternalServerError
      );
    }
  }
  @Post("/reset-password/token")
  async VerifyToken(@Query() token: string): Promise<any> {
    try {
      const user = await this.userService.FindUserByResetToken({
        token,
      });

      return {
        message: "Token is valid. Please reset your password",
        data: user,
      };
    } catch (error: unknown) {
      throw new APIError(
        "An error occurred during reset password",
        StatusCode.InternalServerError
      );
    }
  }
  @Post("/reset-password")
  async ResetPassword(
    @Body() requestBody: { password: string; token: string }
  ) {
    try {
      const { password, token } = requestBody;
      const user = await this.userService.resetPassword({ token, password });

      const messageDetails = {
        username: user.username,
        receiverEmail: user.email,
        template: "resetPassword",
      };

      await publishDirectMessage(
        authChannel,
        "chekromlek-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Reset password message has been sent to notification service"
      );

      return {
        message: "Password reset successfully",
      };
    } catch (error: unknown) {
      throw new APIError(
        "An error occurred during reset password",
        StatusCode.InternalServerError
      );
    }
  }
  @Get("/logout")
  async logout(@Header("authorization") authorization: string): Promise<any> {
    try {
      const token = authorization?.split(" ")[1];
      const decodedUser = await decodedToken(token);
      const isLogout = await this.userService.logout(decodedUser);

      if (!isLogout) {
        throw new APIError("Unable to logout!");
      }
      return { message: "Success logout", isLogout: isLogout };
    } catch (error: unknown) {
      throw error;
    }
  }
}
