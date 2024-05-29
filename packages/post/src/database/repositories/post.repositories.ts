import { PostModel } from "../model/post.model";
import CustomError from "@post/errors/customError";
import { StatusCode } from "@post/utils/const";
import { IAnswer, postDetail } from "../@types/post.interface";
import { Types } from "mongoose";

export class postRepository {
  // Create Post
  async createPost(postInterface: postDetail) {
    try {
      const newPost = await PostModel.create(postInterface);
      return (await newPost).save();
    } catch (error: unknown | any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }
  async findById(postId: Types.ObjectId) {
    return PostModel.findById(postId).exec();
  }

  async addAnswerToPost(postId: string, answer: IAnswer) {
    return await PostModel.findByIdAndUpdate(
      postId,
      { $push: { answers: answer } },
      { new: true }
    );
  }
  async updatePost(id: string, newUpdate: postDetail) {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(id, newUpdate, {
        new: true,
      });
      return updatedPost;
    } catch (error: unknown | any) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw new CustomError(error.message, StatusCode.BadRequest);
      }
    }
  }

  async findPost(id: string) {
    try {
      const findPostById = await PostModel.findById(id);
      return findPostById;
    } catch (error: unknown | any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }
}
