import {
  Body,
  Middlewares,
  Path,
  Post,
  Request,
  Route,
  SuccessResponse,
} from "tsoa";
import validateInput from "@post/middlewares/input-validation";
import { AnswerSchema, PostSaveSchema } from "@post/schema/post.schema";
import { PostService } from "@post/services/post.service";
import { StatusCode } from "@post/utils/const";
import { logger } from "@post/utils/logger";
import { verificationToken } from "@post/middlewares/tokenVerify";
import { IAnswer, postDetail } from "@post/database/@types/post.interface";
import CustomError from "@post/errors/customError";
// import Types } from "mongoose";
// import mongoose from "mongoose";

@Route("v1/post")
export class PostController {
  private postService: PostService;
  constructor() {
    this.postService = new PostService();
  }

  @SuccessResponse(StatusCode.Created, "Created successfully")
  @Post("/")
  @Middlewares(validateInput(PostSaveSchema))
  @Middlewares(verificationToken)
  public async CreatePost(
    @Body() requestBody: postDetail,
    @Request() request: any
  ): Promise<any> {
    try {
      const detailPost = {
        ...requestBody,
        userId: request.userId, // Accessing req.userId instead of req.id
        username: request.username,
      };

      // console.log("req: ", request);

      const post = await this.postService.createPost(detailPost);
      return {
        message: "Post created successfully",
        data: post,
      };
    } catch (error) {
      logger.error(`Service method error: ${error}`);
      throw error;
    }
  }

  @SuccessResponse(StatusCode.Created, "Created successfully")
  @Post("/:id")
  @Middlewares(validateInput(PostSaveSchema))
  @Middlewares(verificationToken)
  public async UpdatePost(
    @Request() request: any,
    @Path() id: string,
    @Body() requestBody: postDetail
  ): Promise<any> {
    try {
      const existPost = await this.postService.findPostById(request.id);
      if (!existPost) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }
      const post = await this.postService.updatePost(id, requestBody);
      return {
        message: "Post updated successfully",
        data: post,
      };
    } catch (error) {
      logger.error(`Service method error: ${error}`);
      throw error;
    }
  }
  @SuccessResponse(StatusCode.Created, "Created successfully")
  @Post("/:id/answer")
  @Middlewares(validateInput(AnswerSchema))
  @Middlewares(verificationToken)
  public async createAnswer(
    @Path() id: string,
    @Body() answer: IAnswer,
    @Request() request: any
  ): Promise<any> {
    try {
      // Debug logging to check the input
      logger.debug(`Received postId: ${id}`);
      logger.debug(`Received username: ${JSON.stringify(answer.username)}`);
      logger.debug(`Received userId: ${JSON.stringify(answer.userId)}`);

      // const userId = request.userId;

      const detailAnswer = {
        ...answer,
        userId: request?.userId,
        username: request?.username,
        postId: answer.postId,
      };

      const newAnswer = await this.postService.createAnswer(id, detailAnswer);

      return {
        message: "Answer created successfully",
        data: newAnswer,
      };
    } catch (error: any) {
      logger.error(`Controller Answer method error: ${error.message}`);
      throw new CustomError(
        `Failed to create answer: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }
}
