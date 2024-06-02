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
  Put,
  Request,
  Route,
  SuccessResponse,
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
  @SuccessResponse(StatusCode.OK, 'OK')
  @Put('/:id')
  // @Middlewares(validateInput(UserUpdateSchema))
  @Middlewares(verificationToken)
  public async UpdateProfile(
    @Path() id: string,
    @Body() reqBody: IUser,
  ): Promise<any> {
    try {
      const modifiedUser = await this.userService.UpdateById(id, reqBody);

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
  @SuccessResponse(StatusCode.OK, 'OK')
  @Get('/:id')
  public async GetUserById(@Path() id: string): Promise<any> {
    try {
      const user = await this.userService.getUserById({ id });
      return {
        message: 'Get Successfully',
        data: user,
      };
    } catch (error) {
      logger.error('Controller Get Auth Error:', error);
      throw error;
    }
  }
  @Post('/:id')
  @Middlewares(verificationToken)
  public async addFavoEvent(
    @Request() request: any,
    @Path() id: string,
  ): Promise<any> {
    try {
      const user = await this.userService.getUserById(request.id);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid event ID format');
      }
      const objectId = new mongoose.Types.ObjectId(id);
      const existingFavoriteIndex = user?.favorites.findIndex((item) =>
        item.equals(objectId),
      );
      console.log(existingFavoriteIndex);
      if (existingFavoriteIndex !== -1) {
        // Remove event from favorites
        user?.favorites.splice(existingFavoriteIndex!, 1);
        await user?.save();

        return {
          message: 'Event removed from favorites successfully',
          data: user,
        };
      }
      user?.favorites.push(objectId);
      await user?.save();

      return {
        message: 'Event added to favorites successfully',
        data: user,
      };
    } catch (error) {
      logger.error('Controller Get User Error:', error);
      throw error;
    }
  }
  @Post('/:id')
  @Middlewares(verificationToken)
  public async addFavPost(@Request() request: any): Promise<any> {
    try {
      const user = await this.userService.getUserById(request.id);
      const postId = user?.favorites;
      const postPromise = postId!.map(async (id) => {
        try {
          const response = await axios.get(
            `http://post:3005/v1/post/${postId}`,
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
