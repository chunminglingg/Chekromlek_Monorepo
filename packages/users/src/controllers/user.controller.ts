import { IUser } from '@users/database/models/user.model';
import APIError from '@users/errors/api-error';
import CustomError from '@users/errors/custom-erorrs';
import { verificationToken } from '@users/middlewares/auth-token-validate';
import { UserService } from '@users/services/user.service';
import { StatusCode } from '@users/utils/consts';
import { logger } from '@users/utils/logger';
import axios from 'axios';
import mongoose from 'mongoose';
import {
  Body,
  Middlewares,
  Path,
  Post,
  Get,
  Request,
  Route,
  SuccessResponse,
  Patch,
} from 'tsoa';

@Route('v1/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  @Get('/save')
  @Middlewares(verificationToken)
  public async findSavePost(@Request() req: any): Promise<any> {
    try {
      console.log(`Request received with authId: ${req.authId}`);

      const user = await this.userService.getUserById(req.userId);
      console.log(`User fetched: ${user}`);

      if (!user) {
        throw new APIError('User not found', StatusCode.NotFound);
      }
      const postIds = user?.saves;
      if (!postIds || !Array.isArray(postIds)) {
        throw new APIError('No saved posts found', StatusCode.NotFound);
      }

      console.log(`PostIDS: ${postIds}`);
      const fetchPost = postIds!.map(async (id) => {
        try {
          const response = await axios.get(
            `http://localhost:3005/v1/post?page=1&limit=10&id=${id}`,
          );
          console.log(`Response for id ${id}: ${response.data}}`);
          return response.data[0];
        } catch (error) {
          console.error(`Error fetching data for id ${id}:`, error);
          return null;
        }
      });
      const posts = (await Promise.all(fetchPost)).filter(
        (post) => post !== null,
      );
      console.log('Post:', posts);
      return {
        message: 'Save Post found successfully',
        data: posts, // not wokring yet
      };
    } catch (error: any) {
      throw new APIError(
        `Error fetching save post ${error}`,
        StatusCode.BadRequest,
      );
    }
  }
  @SuccessResponse(StatusCode.Created, 'Created')
  @Post('/')
  // @Middlewares(validateInput(UserSaveSchema))
  public async SaveProfile(
    @Body() reqBody: IUser & { userId: string },
  ): Promise<any> {
    try {
      const newUser = await this.userService.CreateUser(reqBody);

      return {
        message: 'User profile create successfully',
        data: newUser,
      };
    } catch (error) {
      console.log('Error: ', error);

      logger.error(`Service method error: ${error}`);
      throw error;
    }
  }

  @Get('/')
  public async showAllUser(): Promise<any> {
    try {
      return await this.userService.showAllUser();
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, 'Accepted')
  @Get('/profile')
  @Middlewares(verificationToken)
  public async FindUserById(@Request() request: any): Promise<any> {
    try {
      const user = await this.userService.getAuthById(request.userId);
      console.log(request.authId);
      if (!user) {
        throw new APIError('User Not Found!!', StatusCode.NotFound);
      }
      return {
        message: 'Get user info succesful',
        user: user,
      };
    } catch (error: unknown) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, 'Accepted')
  @Patch('/update')
  @Middlewares(verificationToken)
  public async UpdateUserProfile(
    @Request() request: any,
    @Body() reqBody: IUser,
  ): Promise<any> {
    try {
      const authId = request.userId;
      logger.debug(`user request: ${request.userId}`);
      if (!authId) {
        logger.error(`Could not find user: ${authId}`);
      }
      const findUser = await this.userService.getAuthById(authId);
      logger.debug(`findUser: ${findUser?.id}`);
      if (!findUser) {
        throw new APIError('User Not Found!!', StatusCode.NotFound);
      }
      const modifiedUser = await this.userService.UpdateById(
        findUser.id,
        reqBody,
      );
      if (!modifiedUser) {
        logger.error(`Update user error: ${modifiedUser}`);
      }
      return {
        message: 'Update user profile successfully!',
        data: modifiedUser,
      };
    } catch (err) {}
  }

  @SuccessResponse(StatusCode.OK, 'OK')
  @Patch('{userId}')
  @Middlewares(verificationToken)
  public async UpdateProfile(
    @Path() userId: string,
    @Body() reqBody: IUser,
  ): Promise<any> {
    try {
      logger.info(`Received request to update user with ID: ${userId}`);
      const modifiedUser = await this.userService.UpdateById(userId, reqBody);

      return {
        message: 'User profile update successfully',
        data: modifiedUser,
      };
    } catch (error) {
      logger.error(`UserService controller method error: ${error}`);
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, 'Get User Successfully')
  @Get('{userId}')
  // @Middlewares(verificationToken)
  public async GetById(@Path() userId: string): Promise<any> {
    try {
      const user = await this.userService.getUserById(userId);
      return {
        message: 'Get Successfully',
        data: user,
      };
    } catch (error) {
      logger.error('Controller Get Auth Error:', error);
      throw error;
    }
  }

  @Post('/:userId/posts')
  @Middlewares(verificationToken)
  public async addPostToUser(
    @Path() userId: string,
    @Body() postId: string,
  ): Promise<any> {
    try {
      return await this.userService.updateUserPosts(userId, postId);
    } catch (error) {
      throw error;
    }
  }
  @SuccessResponse(StatusCode.OK, 'Add/Remove Save successfully')
  @Patch('/:postId/addpost')
  @Middlewares(verificationToken)
  public async AddPost(
    @Request() request: any,
    @Path() postId: string,
  ): Promise<any> {
    try {
      console.log('UserID from request:', request.userId);

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid post ID format');
      }

      const user = await this.userService.getAuthById(request.userId);
      console.log('Retrieved USER:', user);

      if (!user) {
        throw new Error('User not found');
      }

      const objectId = new mongoose.Types.ObjectId(postId);

      // Check if the post already exists in the user's post array
      const existingPostIndex = user?.post.findIndex((item) =>
        item.equals(objectId),
      );

      if (existingPostIndex === -1) {
        // If the post does not exist, add it to the user's post array
        user?.post.push(objectId);

        // Save the updated user object
        await user?.save();

        return {
          message: 'Post added successfully',
          data: user,
        };
      } else {
        // If the post already exists, return a message indicating it's already added
        return {
          message: "Post already added to the user's post array",
          data: user,
        };
      }
    } catch (error: unknown | any) {
      console.error('Error in AddPost:', error);
      throw new CustomError(`Error: ${error.message}`);
    }
  }
  // @SuccessResponse(StatusCode.OK, 'Get a user successfully')
  // @Get('/profile')
  // @Middlewares(verificationToken)
  // public async getUserProfile(@Path() request: any): Promise<any> {

  //   const userId = request.authId
  //   logger.debug(request)
  //   logger.debug(`authId: ${userId}`);

  //   try {

  //     const user = await this.userService.getUserProfile(userId);
  //     if (!user) {
  //       throw new Error('User not found');
  //     }

  //     return {
  //       message: 'User profile fetched successfully',
  //       data: user,
  //     };
  //   } catch (error: any) {
  //     logger.error('Controller Get User Profile Error:', error.message);
  //     throw new Error('Failed to fetch user profile: ' + error.message);
  //   }
  // }
}
