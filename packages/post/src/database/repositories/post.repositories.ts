import { PostModel } from "../model/post.model";
import CustomError from "@post/errors/customError";
import { StatusCode } from "@post/utils/const";
import { postDetail } from "../@types/post.interface";

export class postRepository {
  // Create Post
  async createPost(postInterface: postDetail) {
    try {
      const newPost = PostModel.create(postInterface);
      return (await newPost).save();
    } catch (error: unknown | any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }

  async findPost(id: string) {
    try { 
      const findPostById = await PostModel.findById(id)
      return findPostById;
    } catch (error: unknown | any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }

  async updatePost(id: string , newUpdate: postDetail) {
   try {
    const updatedPost = await PostModel.findByIdAndUpdate(id , newUpdate , {new : true});    
    return updatedPost;
   } catch (error: unknown | any) {
     if (error instanceof CustomError) {
       throw error;
     } else {
       throw new CustomError(error.message, StatusCode.BadRequest);
     }
    }
  }

}
