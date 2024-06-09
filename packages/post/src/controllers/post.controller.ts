import {
  Body,
  Get,
  Middlewares,
  Path,
  Patch,
  Post,
  Request,
  Route,
  Delete,
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
import APIError from "@post/errors/api-error";
import axios from "axios";

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
        userId: request.userId,
        username: request.username,
      };

      const post = await this.postService.createPost(detailPost);
      const postId = post._id;
      const token = request.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
      console.log(
        `Updating user with ID: ${request.userId} and Post ID: ${postId}`
      );

      await axios.patch(
        `http://localhost:4000/v1/users/${postId}/addpost`,
        {
          authId: request.userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
  @Get("/getpost/{postId}")
  public async GetPostById(@Path() postId: string): Promise<any> {
    try {
      const existPost = await this.postService.findPostById(postId);

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
  @SuccessResponse(StatusCode.Found, "Found the post")
  @Get("/getpost")
  public async GetPostAllPost(): Promise<any> {
    try {
      const existPost = await this.postService.FindAllPost();

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
  @Patch("/:id")
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
        // answerlikedBy: answer.answerlikedBy || [],
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
      // Assuming the userId is part of the request object after middleware processing
      const userId = request.userId;

      // Additional logging to debug
      console.log(`Decoded user ID: ${userId}`);

      if (!userId) {
        throw new CustomError(
          "User ID is missing from request",
          StatusCode.BadRequest
        );
      }

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
  @SuccessResponse(StatusCode.OK, "Delete successfully")
  @Middlewares(verificationToken)
  @Delete("/:postId")
  public async DeletePost(@Path() postId: string, @Request() request: any) {
    const existedPost = await this.postService.findPostById(request.userId);
    if (!existedPost) {
      throw new APIError("Post Not Found", StatusCode.NotFound);
    }
    await this.postService.deletePost(postId);
    return { message: "Post Delete Successfully" };
  }
  @SuccessResponse(StatusCode.OK, "Get Favorite successfully")
  @Get("/:postId")
  @Middlewares(verificationToken)
  public async FindFavo(
    @Path() postId: string,
    @Request() request: any
  ): Promise<any> {
    try {
      const existedPost = await this.postService.findPostUser(request.userId);
      if (!existedPost) {
        throw new APIError("Post Not Found !!", StatusCode.NotFound);
      }
      const post = await this.postService.findPostById(postId);
      return post;
    } catch (error) {
      throw error;
    }
  }
  @SuccessResponse(StatusCode.OK, "Add/Remove Save successfully")
  @Get("/{postId}/save")
  @Middlewares(verificationToken)
  public async toggleSavePost(@Path() postId: string): Promise<any> {
    try {
      // Get post information
      const post = await this.postService.findPostById(postId);

      if (!post) {
        throw new Error("Post not found");
      }
      await this.postService.savePost(postId);

      // Return a success response
      return {
        message: "Post saved successfully",
        data: post, // Optionally, include the post data in the response
      };
    } catch (error) {
      // Handle errors
      logger.error(`Failed to save post: ${error}`);
      throw new CustomError(
        `Failed to save post: ${error}`,
        StatusCode.InternalServerError
      );
    }
  }
}
