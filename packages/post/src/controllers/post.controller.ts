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
  Queries,
} from "tsoa";
import validateInput from "@post/middlewares/input-validation";
import { PostSaveSchema } from "@post/schema/post.schema";
import { PostService } from "@post/services/post.service";
import { StatusCode } from "@post/utils/const";
import { logger } from "@post/utils/logger";
import { verificationToken } from "@post/middlewares/tokenVerify";
import {
  IAnswer,
  IPost,
  PostCategory,
  QueryParams,
} from "@post/database/@types/post.interface";
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
        `http://user-profile:4000/v1/users/${postId}/addpost`,
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
  @Get("/")
  public async FindPostByQueries(
    @Queries() queryParam: QueryParams
  ): Promise<any> {
    try {
      console.log(queryParam);
      return this.postService.findPostByQueries(queryParam);
    } catch (error: unknown) {
      throw new APIError("Post Not Found !!", StatusCode.NotFound);
    }
  }

  @SuccessResponse(StatusCode.Accepted, "Get a post successfully")
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
  @SuccessResponse(StatusCode.Accepted, "Get a Post successfully")
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
  @SuccessResponse(StatusCode.Accepted, "Get Category")
  @Get("category/{category}")
  public async getPostsByCategory(@Path() category: string): Promise<any> {
    try {
      const validCategories = Object.values(PostCategory);
      if (!validCategories.includes(category as PostCategory)) {
        return { message: "Invalid category", data: [] };
      }

      const posts = await this.postService.getPostsByCategory(
        category as PostCategory
      );
      return { message: "Posts found successfully", data: posts };
    } catch (error) {
      return { message: "Internal Server Error", data: [] };
    }
  }
  @SuccessResponse(StatusCode.Created, "Updated successfully")
  @Patch("/:id")
  @Middlewares(validateInput(PostSaveSchema))
  @Middlewares(verificationToken)
  public async UpdatePost(
    @Path() id: string,
    @Body() requestBody: IPost,
    @Request() request: any
  ): Promise<any> {
    try {
      const existPost = await this.postService.findPostById(id);
      if (!existPost) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }
      const userId = request.userId;
      const postOwnerId = existPost.userId ? existPost.userId.toString() : null;

      if (!postOwnerId || postOwnerId !== userId) {
        throw new CustomError("Unauthorized access ", StatusCode.Forbidden);
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
  public async DeletePost(@Path() postId: string, @Request() request: any) {
    const existedPost = await this.postService.findPostById(postId);
    if (!existedPost) {
      throw new APIError("Post Not Found", StatusCode.NotFound);
    }
    const userId = request.userId.toString(); // Ensure userId is a string
    const postOwnerId = existedPost.userId
      ? existedPost.userId.toString()
      : null;
    if (!postOwnerId || postOwnerId !== userId) {
      throw new CustomError("Unauthorized access ", StatusCode.Forbidden);
    }
    await this.postService.deletePost(postId);
    return { message: "Post Delete Successfully" };
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
}
