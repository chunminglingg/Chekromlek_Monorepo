import {
  Body,
  Get,
  Middlewares,
  Path,
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
      return {
        message: "Post created successfully",
        data: post,
      };
    } catch (error) {
      logger.error(`Service method error: ${error}`);
      throw error;
    }
  }

  @SuccessResponse(StatusCode.Found, "Found all the posts successfully")
  @Get('/')
  public async GetAllPosts(): Promise<any> {
    try {
      const posts = await this.postService.findAllPost();
      return {
        message: "All posts found successfully",
        data: posts,
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

  @SuccessResponse(StatusCode.Created, "Updated successfully")
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
  @Middlewares(verificationToken)
  public async createAnswer(
    @Path() id: string,
    @Body() answer: IAnswer,
    @Request() request: any
  ): Promise<any> {
    try {
      logger.debug(`Received postId: ${id}`);
      logger.debug(`Received username: ${JSON.stringify(request?.username)}`);
      logger.debug(`Received userId: ${JSON.stringify(request?.userId)}`);

      const detailAnswer = {
        ...answer,
        userId: request.userId,
        username: request.username,
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
      const userId = request.userId;

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

  @SuccessResponse(StatusCode.NoContent, "Deleted successfully")
  @Middlewares(verificationToken)
  @Delete("/:postId")
  public async DeletePost(@Path() postId: string, @Request() _request: any) {
    try {
      const existedPost = await this.postService.findPostById(postId);
      if (!existedPost) {
        throw new APIError("Post Not Found", StatusCode.NotFound);
      }
      await this.postService.deletePost(postId);
      return { message: "Post deleted successfully" };
    } catch (error: any) {
      logger.error(`Controller deletePost method error: ${error.message}`);
      throw new CustomError(
        `Failed to delete post: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }

  @SuccessResponse(StatusCode.OK, "Favorite retrieved successfully")
  @Get("/{postId}/favorite")
  @Middlewares(verificationToken)
  public async FindFavorite(
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
    } catch (error: any) {
      logger.error(`Controller findFavorite method error: ${error.message}`);
      throw new CustomError(
        `Failed to find favorite: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }

  @SuccessResponse(StatusCode.OK, "Saved successfully")
  @Get("/{postId}/save")
  @Middlewares(verificationToken)
  public async toggleSavePost(@Path() postId: string): Promise<any> {
    try {
      const post = await this.postService.findPostById(postId);
      if (!post) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }
      await this.postService.savePost(postId);
      return {
        message: "Post saved successfully",
        data: post,
      };
    } catch (error) {
      logger.error(`Failed to save post: ${error}`);
      throw new CustomError(
        `Failed to save post: ${error}`,
        StatusCode.InternalServerError
      );
    }
  }

  @Get("/{userId}/posts")
  @SuccessResponse(StatusCode.Found, "Posts found")
  @Middlewares(verificationToken)
  public async getPostsByUserId(@Path() userId: string): Promise<any> {
    try {
      const post = await this.postService.getPostsByUserId(userId);
      if (!post) {
        throw new CustomError("Posts not found", StatusCode.NotFound);
      }
      return {
        message: "Posts found successfully",
        data: post,
      };
    } catch (error: any) {
      logger.error(`Controller getPostsByUserId method error: ${error.message}`);
      throw new CustomError(
        `Failed to get posts by user: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }
}
