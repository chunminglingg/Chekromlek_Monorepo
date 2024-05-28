import {
  Body,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Route,
  Tags,
  Middlewares,
  SuccessResponse,
} from 'tsoa';
import { IAnswer } from '@answers/database/@types/answer.type';
import { AnswerService } from '@answers/services/answer.service';
import { StatusCode } from '@answers/utils/consts';
import { verificationToken } from '@answers/middlewares/auth-token-validate';
import { logger } from '@answers/utils/logger';
import CustomError from '@answers/errors/custom-erorrs';

@Route('v1/answer')
@Tags('Answer')
export class AnswerController {
  private answerService: AnswerService;

  constructor() {
    this.answerService = new AnswerService();
  }

  @SuccessResponse(StatusCode.Created, 'Created')
  @Post('/')
  @Middlewares(verificationToken)
  public async createAnswer(@Body() answer: IAnswer): Promise<any> {
    try {
      const answerToCreate: IAnswer = {
        ...answer,
        userId: answer.userId,
        postId: answer.postId,
      };
      const newAnswer = this.answerService.createAnswer(answerToCreate);
      return newAnswer;
    } catch (error) {
      logger.error(`Controller Create method error: ${error}`);
      throw error;
    }
  }

  @Get('{id}')
  @SuccessResponse(StatusCode.Found, 'Found')
  @Middlewares(verificationToken)
  public async getAnswerById(@Path() id: string): Promise<any> {
    try {
      return this.answerService.findById(id);
    } catch (error) {
      logger.error(`GetAnswerById Create method error: ${error}`);
      throw error;
    }
  }

  @Get('/getallAnswer')
  @SuccessResponse(StatusCode.Found, 'Found')
  @Middlewares(verificationToken)
  public async getAllAnswers(): Promise<any> {
    try {
      return this.answerService.findAll();
    } catch (error) {
      logger.error(`GetAnswerById Create method error: ${error}`);
      throw error;
    }
  }

  @Put('{id}')
  @SuccessResponse(StatusCode.OK, 'OK')
  @Middlewares(verificationToken)
  public async updateAnswer(
    @Path() id: string,
    @Body() answer: IAnswer,
  ): Promise<any> {
    try {
      const existPost = await this.answerService.findById(id);
      if (!existPost) {
        throw new CustomError('Answers not found', StatusCode.NotFound);
      }
      return this.answerService.updateAnswer(id, answer);
    } catch (error) {
      logger.error(`Update method error: ${error}`);
      throw error;
    }
  }

  @Delete('/delete/{id}')
  @SuccessResponse(StatusCode.Found, 'Found')
  @Middlewares(verificationToken)
  public async deleteAnswer(@Path() id: string): Promise<{ message: string }> {
    try {
      await this.answerService.deleteAnswer(id);
      return { message: 'Answer deleted successfully' };
    } catch (error) {
      logger.error(`Delete  method error: ${error}`);
      throw error;
    }
  }

  @Get('{id}/user')
  @SuccessResponse(StatusCode.Found, 'Found')
  @Middlewares(verificationToken)
  public async getAnswerByIdWithUser(@Path() id: string): Promise<any> {
    try {
      return this.answerService.findByIdWithUser(id);
    } catch (error) {
      throw error;
    }
  }
}
