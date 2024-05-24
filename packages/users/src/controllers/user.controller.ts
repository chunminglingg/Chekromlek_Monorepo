import { IUser } from '../database/models/user.model';
import validateInput from '@users/middlewares/validate-input';
import { UserSaveSchema, UserUpdateSchema } from '@users/schema/user.schema';
import { UserService } from '@users/services/user.service';
import { StatusCode } from '@users/utils/consts';
import { logger } from '@users/utils/logger';
// import axios from 'axios';
import {
  Body,
  Middlewares,
  Path,
  Post,
  Put,
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
  @Middlewares(validateInput(UserSaveSchema))
  public async SaveProfile(
    @Body() reqBody: IUser & { userId: string }
  ): Promise<any> {
    try {
      // const authResponse = await axios.get(
      //   `http://localhost:3001/v1/auth/verify?token=${reqBody.authId}`
      // );
      // console.log(authResponse);

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
  @SuccessResponse(StatusCode.OK, 'OK')
  @Put('/:userId')
  @Middlewares(validateInput(UserUpdateSchema))
  public async UpdateProfile(
    @Body() reqBody: IUser,
    @Path() userId: string
  ): Promise<any> {
    try {
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
}
