import { IUser } from '@users/database/models/user.model';
import APIError from '@users/errors/api-error';
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
      if (!user) {
        throw new APIError('Cannot find user in database', StatusCode.NotFound);
      }

      const postIds = user?.saves;
      if (!postIds || postIds.length === 0) {
        return {
          message: 'No saved posts found',
          data: [],
        };
      }

      const postServiceUrl =
        getConfig().postServiceUrl || 'http://localhost:3005';
      const postPro = postIds.map(async (postId) => {
        try {
          const postResponse = await axios.get(
            `${postServiceUrl}/v1/post?page=1&limit=5&id=${postId}`,
          );
          return postResponse.data.posts[0];
        } catch (error) {
          logger.error(`Error fetching data for id ${postId}: ${error}`);
          return null;
        }
      });

      const posts = (await Promise.all(postPro)).filter(
        (post) => post !== null,
      );
      return {
        message: 'Save post found successfully',
        data: posts,
      };
    } catch (error) {
      logger.error(`Error in findSavePost: ${error}`);
      throw new APIError('Error fetching saved posts', StatusCode.BadRequest);
    }
  }

  @Get('/post')
  @Middlewares(verificationToken)
  public async findPost(@Request() req: any): Promise<any> {
    try {
      const user = await this.userService.getAuthById(req.userId);
      if (!user) {
        throw new APIError('Cannot find user in database', StatusCode.NotFound);
      }

      const postIds = user?.post;
      if (!postIds || postIds.length === 0) {
        return {
          message: 'No saved posts found',
          data: [],
        };
      }

      const postServiceUrl =
        getConfig().postServiceUrl || 'http://localhost:3005';
      const postPro = postIds.map(async (postId) => {
        try {
          const postResponse = await axios.get(
            `${postServiceUrl}/v1/post?page=1&limit=5&id=${postId}`,
          );
          return postResponse.data.posts[0];
        } catch (error) {
          logger.error(`Error fetching data for id ${postId}: ${error}`);
          return null;
        }
      });

      const posts = (await Promise.all(postPro)).filter(
        (post) => post !== null,
      );
      return {
        message: 'Get post found successfully',
        data: posts,
      };
    } catch (error) {
      logger.error(`Error in findPost: ${error}`);
      throw new APIError('Error fetching posts', StatusCode.BadRequest);
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
        message: 'User profile created successfully',
        data: newUser,
      };
    } catch (error) {
      logger.error(`Error in SaveProfile: ${error}`);
      throw new APIError('Error creating user profile', StatusCode.BadRequest);
    }
  }

  @Get('/')
  public async showAllUser(): Promise<any> {
    try {
      return await this.userService.showAllUser();
    } catch (error) {
      logger.error(`Error in showAllUser: ${error}`);
      throw new APIError('Error fetching all users', StatusCode.BadRequest);
    }
  }

  @SuccessResponse(StatusCode.OK, 'Accepted')
  @Get('/profile')
  @Middlewares(verificationToken)
  public async FindUserById(@Request() request: any): Promise<any> {
    try {
      const user = await this.userService.getAuthById(request.userId);
      if (!user) {
        throw new APIError('User not found', StatusCode.NotFound);
      }
      return {
        message: 'Get user info successful',
        user,
      };
    } catch (error) {
      logger.error(`Error in FindUserById: ${error}`);
      throw new APIError('Error fetching user info', StatusCode.BadRequest);
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
      const user = await this.userService.getAuthById(request.userId);
      if (!user) {
        throw new APIError('User not found', StatusCode.NotFound);
      }

      const modifiedUser = await this.userService.UpdateById(user.id, reqBody);
      return {
        message: 'Update user profile successfully',
        data: modifiedUser,
      };
    } catch (error) {
      logger.error(`Error in UpdateUserProfile: ${error}`);
      throw new APIError('Error updating user profile', StatusCode.BadRequest);
    }
  }

  @SuccessResponse(StatusCode.OK, 'OK')
  @Patch('{userId}')
  @Middlewares(verificationToken)
  public async UpdateProfile(
    @Path() userId: string,
    @Body() reqBody: IUser,
  ): Promise<any> {
    try {
      const modifiedUser = await this.userService.UpdateById(userId, reqBody);
      return {
        message: 'User profile updated successfully',
        data: modifiedUser,
      };
    } catch (error) {
      logger.error(`Error in UpdateProfile: ${error}`);
      throw new APIError('Error updating user profile', StatusCode.BadRequest);
    }
  }

  @SuccessResponse(StatusCode.OK, 'Get User Successfully')
  @Get('{userId}')
  public async GetById(@Path() userId: string): Promise<any> {
    try {
      const user = await this.userService.getUserById(userId);
      return {
        message: 'Get successfully',
        data: user,
      };
    } catch (error) {
      logger.error(`Error in GetById: ${error}`);
      throw new APIError('Error fetching user', StatusCode.BadRequest);
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
      logger.error(`Error in addPostToUser: ${error}`);
      throw new APIError('Error adding post to user', StatusCode.BadRequest);
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
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new APIError('Invalid post ID format', StatusCode.BadRequest);
    }

    const user = await this.userService.getAuthById(request.userId);
    if (!user) {
      throw new APIError('User not found', StatusCode.NotFound);
    }

    const objectId = new mongoose.Types.ObjectId(postId);
    const existingPostIndex = user.post.findIndex((item) =>
      item.equals(objectId),
    );

    if (existingPostIndex === -1) {
      user.post.push(objectId);
      await user.save();

      return {
        message: 'Post added successfully',
        data: user,
      };
    } else {
      return {
        message: "Post already added to the user's post array",
        data: user,
      };
    }
  } catch (error) {
    logger.error(`Error in AddPost: ${error}`);
    throw new APIError('Error adding post to user', StatusCode.InternalServerError);
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
        throw new APIError('Invalid post ID format', StatusCode.BadRequest);
      }

      const user = await this.userService.getAuthById(request.userId);
      if (!user) {
        throw new APIError('User not found', StatusCode.NotFound);
      }

      const postServiceUrl =
        getConfig().postServiceUrl || 'http://localhost:3005';
      const postResponse = await axios.get(
        `${postServiceUrl}/v1/post?page=1&limit=5&id=${postId}`,
      );
      if (
        !postResponse.data ||
        !postResponse.data.posts ||
        postResponse.data.posts.length === 0
      ) {
        throw new APIError('Post not found', StatusCode.NotFound);
      }

      const post = postResponse.data.posts[0];
      const existingFavoriteIndex = user.saves.findIndex((item) =>
        item.equals(post._id),
      );

      if (existingFavoriteIndex !== -1) {
        // Remove post from saves
        user.saves.splice(existingFavoriteIndex, 1);
        await user.save();
        logger.info(
          `Post ${postId} removed from saves for user ${request.userId}`,
        );
        return {
          message: 'Post removed from saves successfully',
          data: user,
        };
      } else {
        // Add post to saves
        user.saves.push(post._id);
        await user.save();
        logger.info(`Post ${postId} added to saves for user ${request.userId}`);
        return {
          message: 'Post added to saves successfully',
          data: user,
        };
      }
    } catch (error: any) {
      logger.error(
        `Error in toggleSavePost for user ${request.userId} and post ${postId}: ${error.message}`,
        {
          userId: request.userId,
          postId,
          error: error.stack,
        },
      );
      throw new APIError('Error toggling saved post', StatusCode.BadRequest);
    }
  }
}
