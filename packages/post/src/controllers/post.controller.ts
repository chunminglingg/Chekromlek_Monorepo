import { IPost } from "@post/database/model/post.model";
import validateInput from "@post/middlewares/input-validation";
import { PostSaveSchema } from "@post/schema/post.schema";
import { PostService } from "@post/services/post.service";
import { StatusCode } from "@post/utils/const";
import { logger } from "@post/utils/logger";
import {
  Body,
  Middlewares,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
} from "tsoa";

@Route("v1/post")
export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  @SuccessResponse(StatusCode.Created, "Created successfully")
  @Post("/")
  @Middlewares(validateInput(PostSaveSchema))
  public async SavePost(
    @Body() reqBody: IPost & { userId: string }
  ): Promise<any> {
    try {
      const newPost = await this.postService.createPost(reqBody);
      return {
        message: "Post created successfully",
        data: newPost,
      };
    } catch (error) {
      console.log("Error: ", error);
      logger.error(`Service method error: ${error}`);
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "Okay")
  @Put("/:id")
  @Middlewares(validateInput(PostSaveSchema))
  public async UpdatePost(
    @Path() id: string,
    @Body() reqBody: IPost
  ): Promise<any> {
    try {
      const updatedPost = await this.postService.updatePost(id, reqBody);
      return {
        message: "Post updated successfully",
        data: updatedPost,
      };
    } catch (error) {
      logger.error(`PostService controller method error: ${error}`);
      throw error;
    }
  }
}
