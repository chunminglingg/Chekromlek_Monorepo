import { IUser } from '@users/database/models/user.model';
import APIError from '@users/errors/api-error';
import CustomError from '@users/errors/custom-erorrs';
import { verificationToken } from '@users/middlewares/auth-token-validate';
import { UserService } from '@users/services/user.service';
import getConfig from '@users/utils/config';
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
      const user = await this.userService.getAuthById(req.userId);
      const postIds = user?.saves;
      if (!postIds || postIds.length === 0) {
        // console.log('No saved posts found for the user.');
        return {
          message: 'No saved posts found',
          data: [],
        };
      }
      // console.log(`User's saved post IDs: ${postIds}`);

      const postPro = postIds.map(async (postId) => {
        try {
          const postService =
            getConfig().postServiceUrl || 'http://localhost:3005';
          const postReponse = await axios.get(
            `${postService}/v1/post?page=1&limit=5&id=${postId}`,
          );
          // console.log(`Response for id ${postId}: ${postReponse.data}`);
          const posts = postReponse.data.posts[0];
          // console.log('Response post:', posts);
          return posts;
        } catch (error) {
          // console.error(`Error fetching data for id ${postId}:`, error);
          return null; // or handle differently if needed
        }
      });

      const posts = (await Promise.all(postPro)).filter(
        (post) => post !== null,
      );
      if (posts.length === 0) {
        console.log('No valid posts found from the saved post IDs.');
      } else {
        console.log(`Found posts: ${JSON.stringify(posts)}`);
      }
      return {
        message: 'Save post found successfully',
        data: posts,
      };
    } catch (error: unknown) {
      throw new APIError(
        'Error fetching favorite events',
        StatusCode.BadRequest,
      );
    }
  }
  @Get('/post')
  @Middlewares(verificationToken)
  public async findPost(@Request() req: any): Promise<any> {
    try {
      const user = await this.userService.getAuthById(req.userId);
      const postIds = user?.post;
      if (!postIds || postIds.length === 0) {
        console.log('No saved posts found for the user.');
        return {
          message: 'No saved posts found',
          data: [],
        };
      }
      console.log(`User's saved post IDs: ${postIds}`);

      const postPro = postIds.map(async (postId) => {
        try {
          const postService =
            getConfig().postServiceUrl || 'http://localhost:3005';
          const postReponse = await axios.get(
            `${postService}/v1/post?page=1&limit=5&id=${postId}`,
          );
          const posts = postReponse.data.posts[0];
          return posts;
        } catch (error) {
          console.error(`Error fetching data for id ${postId}:`, error);
          return null; // or handle differently if needed
        }
      });

      const posts = (await Promise.all(postPro)).filter(
        (post) => post !== null,
      );
      if (posts.length === 0) {
        console.log('No valid posts found from the saved post IDs.');
      } else {
        console.log(`Found posts: ${JSON.stringify(posts)}`);
      }
      return {
        message: 'Save post found successfully',
        data: posts,
      };
    } catch (error: unknown) {
      throw new APIError(
        'Error fetching favorite events',
        StatusCode.BadRequest,
      );
    }
  }
  @SuccessResponse(StatusCode.Created, 'Created')
  @Post('/')
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
      console.log(request.userId);
      if (!user) {
        throw new APIError('User Not Found!!', StatusCode.NotFound);
      }
      return {
        message: 'Get user info succesful',
        user: user,
      };
    } catch (error: unknown) {
      logger.error("error:" , error);
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
      const user = request.userId;
      logger.debug(`user request: ${request.userId}`);
      if (!user) {
        logger.error(`Could not find user: ${user}`);
      }
      const findUser = await this.userService.getAuthById(user);
      logger.debug(`findUser: ${findUser}`);
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
    } catch (error) {
      throw new CustomError(`${error}`);
    }
  }

  @SuccessResponse(StatusCode.OK, 'Add/Remove Save successfully')
  @Post('/save/{postId}')
  @Middlewares(verificationToken)
  public async toggleSavePost(
    @Request() request: any,
    @Path() postId: string,
  ): Promise<any> {
    try {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid event ID format');
      }
      const user = await this.userService.getAuthById(request.userId);
      const postService = getConfig().postServiceUrl || 'http://localhost:3005';
      const postResponse = await axios.get(
        `${postService}/v1/post?page=1&limit=5&id=${postId}`,
      );
      console.log('found posts: ', postResponse.data);
      const post = postResponse.data.posts[0];

      const existingFavoriteIndex = user?.saves.findIndex((item) =>
        item.equals(post._id),
      );
      console.log('Existing Favorite Index: ', existingFavoriteIndex);

      if (existingFavoriteIndex !== -1) {
        // Remove event from favorites
        user?.saves.splice(existingFavoriteIndex!, 1);
        await user?.save();

        return {
          message: 'Post removed from saves successfully',
          data: user,
        };
      }

      // Add event to favorites
      user?.saves.push(post._id);
      await user?.save();

      return {
        message: 'Post added to save successfully',
        data: user,
      };
    } catch (error) {
      throw new CustomError(`${error}`);
    }
  }
}
