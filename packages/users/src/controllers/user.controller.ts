import { IUser } from '@users/database/models/user.model';
import { verificationToken } from '@users/middlewares/auth-token-validate';
import { UserService } from '@users/services/user.service';
import { StatusCode } from '@users/utils/consts';
import { logger } from '@users/utils/logger';
import {
  Body,
  Middlewares,
  Path,
  Post,
  Get,
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
}
