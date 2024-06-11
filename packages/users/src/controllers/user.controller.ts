import { IUser } from '@users/database/models/user.model';
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
  @SuccessResponse(StatusCode.Created, 'Created')
  @Post('/')
  // @Middlewares(validateInput(UserSaveSchema))
  public async SaveProfile(
    @Body() reqBody: IUser & { authId: string },
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
  @SuccessResponse(StatusCode.Found, 'Found')
  @Get('{id}')
  public async FindUserById(@Path() id: string): Promise<any> {
    try {
      return await this.userService.getUserById(id);
    } catch (error: unknown) {
      throw error;
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
      console.log(`Received request to update user with ID: ${userId}`);
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
  @SuccessResponse(StatusCode.OK, 'OK')
  @Get('/auth/:authId')
  @Middlewares(verificationToken)
  public async GetAuthById(@Path() authId: string): Promise<any> {
    try {
      const user = await this.userService.getAuthById(authId);
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
  @Post('/:postId/save')
  @Middlewares(verificationToken)
  public async toggleSavePost(
    @Request() request: any,
    @Path() postId: string,
  ): Promise<any> {
    try {
      const userId = request.authId;
      // const token = request.headers.authorization?.split(' ')[1];

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid post ID format');
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format');
      }

      const objectId = new mongoose.Types.ObjectId(postId);

      const user = await this.userService.getAuthById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const post = await axios.get(
        `http://localhost:3005/v1/post?page=1&limit=6id=${postId}`,
      );

      const existingFavoriteIndex = user.saves.findIndex((item) =>
        item.equals(post.data[0]._id),
      );
      let isSave: boolean;
      if (existingFavoriteIndex !== -1) {
        // Remove post from favorites
        user?.saves.splice(existingFavoriteIndex, 1);
        isSave = false;
        await user?.save();
      } else {
        // Add post to favorites
        user.saves.push(objectId);
        isSave = true;
      }
      await user.save();

      return {
        message: `Post ${isSave ? 'added to' : 'removed from'} save successfully`,
        data: user,
      };
    } catch (error) {
      throw new CustomError(`${error}`);
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
      const authId = request.authId; // Assuming userId is actually authId

      if (!mongoose.Types.ObjectId.isValid(authId)) {
        throw new Error('Invalid auth ID format');
      }

      const user = await this.userService.getAuthById(authId); // Assuming this method retrieves user by authId
      if (!user) {
        throw new Error('User not found');
      }

      const objectId = new mongoose.Types.ObjectId(postId);

      // Check if the post already exists in the user's post array
      const existingPostIndex = user.post.findIndex((item) =>
        item.equals(objectId),
      );
      if (existingPostIndex === -1) {
        // If the post does not exist, add it to the user's post array
        user.post.push(objectId);

        // Save the updated user object
        await user.save();

        return {
          message: `Post added successfully`,
          data: user,
        };
      } else {
        // If the post already exists, return a message indicating it's already added
        return {
          message: `Post already added to the user's post array`,
          data: user,
        };
      }
    } catch (error) {
      throw new CustomError(`${error}`);
    }
  }

  @Post('/:id')
  @Middlewares(verificationToken)
  @SuccessResponse(StatusCode.Found, 'Found Successfully')
  public async FindSavePost(@Request() request: any): Promise<any> {
    try {
      const user = await this.userService.getUserById(request.id);
      const postId = user?.saves;
      const postPromise = postId!.map(async (id) => {
        try {
          const response = await axios.get(
            `http://localhost:3005/v1/post/save`,
          );

          return response.data;
        } catch (error) {
          console.error(`Error fetching data for id ${id}:`, error);
          return null;
        }
      });
      const posts = (await Promise.all(postPromise)).filter(
        (event) => event !== null,
      );
      return {
        message: 'Favorite events found successfully',
        data: posts, // not wokring yet
      };
    } catch (error) {
      throw new CustomError(
        'Error fetching favorite events',
        StatusCode.BadRequest,
      );
    }
  }
}
