import { createPost, updatePostRepository } from "./@types/post-user.types";
import { PostSchema } from "../model/post.model";
import CustomError from "@post/errors/customError";
import { StatusCode } from "@post/utils/const";

export class PostRepository {
  // Create Post
  async createPost(post: createPost) {
    try {
      const newPost = new PostSchema(post);
      return await newPost.save();
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw Error;
      }
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }

  async FindPostById({id} : {id: string}) {
    try {
        const existingPost = await PostSchema.findById(id);
        return existingPost;
      } catch (error: any) {
        throw new Error("error is not found")
      }
    }
  async updatePost({
    id,
    update,
  }: {
    id: string;
    update: updatePostRepository;
  }) {
    try {
        const isExist = await this.FindPostById({ id });
        if (!isExist) {
          throw new CustomError("Post does not exist", StatusCode.NotFound);
        }
        const existingPost = await PostSchema.findByIdAndUpdate(id, update, {
          new: true,
        });
        return existingPost;
      } catch (error: any) {
        throw new CustomError(error.message , StatusCode.BadRequest)
    }
  }
}
