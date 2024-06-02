import {
  Body,
  Get,
  Middlewares,
  Path,
  Post,
  Request,
  Route,
  SuccessResponse,
} from "tsoa";
import validateInput from "@post/middlewares/input-validation";
import { PostSaveSchema } from "@post/schema/post.schema";
import { PostService } from "@post/services/post.service";
import { StatusCode } from "@post/utils/const";
import { logger } from "@post/utils/logger";
import { verificationToken } from "@post/middlewares/tokenVerify";
import { IAnswer, IPost } from "@post/database/@types/post.interface";
import CustomError from "@post/errors/customError";

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
    @Body() requestBody: IPost,
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

  @SuccessResponse(StatusCode.Found, "Found the post")
  @Get("/{id}")
  public async GetPostById(@Path() id: string): Promise<any> {
    try {
      const existPost = await this.postService.findPostById(id);

      if (!existPost) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }
      return {
        message: "Post found successfully",
        data: existPost,
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
    @Path() id: string,
    @Body() requestBody: IPost
  ): Promise<any> {
    try {
      const existPost = await this.postService.findPostById(id);
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
  // @Middlewares(validateInput(AnswerSchema))
  @Middlewares(verificationToken)
  public async createAnswer(
    @Path() id: string,
    @Body() answer: IAnswer,
    @Request() request: any
  ): Promise<any> {
    try {
      // Debug logging to check the input
      logger.debug(`Received postId: ${id}`);
      logger.debug(`Received username: ${JSON.stringify(request?.username)}`);
      logger.debug(`Received userId: ${JSON.stringify(request?.userId)}`);

      const detailAnswer = {
        ...answer,
        userId: request!.userId,
        username: request!.username,
        postId: id,
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
  @SuccessResponse(StatusCode.OK, "Liked successfully")
  @Post("/:postId/:answerId/like")
  @Middlewares(verificationToken)
  public async LikeAnswer(
    @Path() postId: string,
    @Path() answerId: string,
    @Request() request: any
  ): Promise<any> {
    try {
      const userId = request.userId;
      const updatedPost = await this.postService.LikeAnswer(
        postId,
        answerId,
        userId
      );
      return {
        message: "Answer liked successfully",
        data: updatedPost,
      };
    } catch (error: any) {
      logger.error(`Controller likeAnswer method error: ${error.message}`);
      throw new CustomError(
        `Failed to like answer: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }
  @SuccessResponse(StatusCode.OK, "Unliked successfully")
  @Post("/:postId/:answerId/unlike")
  @Middlewares(verificationToken)
  public async UnlikeAnswer(
    @Path() postId: string,
    @Path() answerId: string,
    @Request() request: any
  ): Promise<any> {
    try {
      const userId = request.user;
      const updatedPost = await this.postService.UnlikeAnswer(
        postId,
        answerId,
        userId
      );
      return {
        message: "Answer unliked successfully",
        data: updatedPost,
      };
    } catch (error: any) {
      logger.error(`Controller unlikeAnswer method error: ${error.message}`);
      throw new CustomError(
        `Failed to unlike answer: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }
  @SuccessResponse(StatusCode.OK, "Liked successfully")
  @Post("/:postId/likepost")
  @Middlewares(verificationToken)
  public async LikePost(
    @Path() postId: string,
    @Request() request: any
  ): Promise<{ message: string; data: any }> {
    try {
      const userId = request.userId;
      const updatedLikePost = await this.postService.LikePost(postId, userId);
      return {
        message: "Post liked successfully",
        data: updatedLikePost,
      };
    } catch (error: any) {
      logger.error("Controller like post method() error:", error);
      throw new CustomError(
        `Failed to Like post: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }

  @SuccessResponse(StatusCode.OK, "UnLiked successfully")
  @Post("/:postId/unlikepost")
  @Middlewares(verificationToken)
  public async UnLikePost(
    @Path() postId: string,
    @Request() request: any
  ): Promise<{ message: string; data: any }> {
    try {
      const userId = request.userId;
      const updatedLikePost = await this.postService.UnlikePost(postId, userId);
      return {
        message: "Post Unliked successfully",
        data: updatedLikePost,
      };
    } catch (error: any) {
      logger.error("Controller Unlike post method() error:", error);
      throw new CustomError(
        `Failed to UnLike post: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }
}
