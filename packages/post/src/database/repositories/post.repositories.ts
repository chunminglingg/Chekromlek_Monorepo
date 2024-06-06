import { PostModel } from "../model/post.model";
import CustomError from "@post/errors/customError";
import { StatusCode } from "@post/utils/const";
import { IAnswer, IPost } from "../@types/post.interface";
import { logger } from "@post/utils/logger";

export class postRepository {
  // Create Post
  async createPost(postInterface: IPost) {
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
  async findAnswerById(answerId: string) {
    return PostModel.findById(answerId);
  }

  async findAllPost () {
    try {
      return await PostModel.find();
    } catch (error: unknown | any) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(error.message, StatusCode.BadRequest);
    }
  }

  async addAnswerToPost(postId: string, answer: IAnswer) {
    try {
      return await PostModel.findByIdAndUpdate(
        postId,
        { $push: { answers: answer } },
        { new: true, useFindAndModify: false }
      );
    } catch (error) {
      logger.error("Answer to the post method() error: ", error);
      throw error;
    }
  }
  async updatePost(id: string, newUpdate: IPost) {
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
  async LikeAnswer(postId: string, answerId: string, userId: string) {
    try {
      return PostModel.findOneAndUpdate(
        {
          _id: postId,
          "answers._id": answerId,
          "answers.answerlikes": { $ne: userId },
        },
        {
          $inc: { "answers.$.likeCounts": 1 },
          $addToSet: { "answers.$.answerlikedBy": userId },
        },
        { new: true }
      );
    } catch (error) {
      logger.error("Repository Unlike method() error", error);
      throw error;
    }
  }
  async UnlikeAnswer(postId: string, answerId: string, userId: string) {
    try {
      return PostModel.findOneAndUpdate(
        { _id: postId, "answers._id": answerId, "answers.answerlikes": userId },
        {
          $inc: { "answers.$.likeCounts": -1 },
          $pull: { "answers.$.answerlikedBy": userId },
        },
        { new: true }
      );
    } catch (error) {
      logger.error("Repository Unlike method() error", error);
      throw error;
    }
  }
  async LikePost(postId: string, userId: string) {
    return PostModel.findByIdAndUpdate(
      postId,
      {
        $addtoSet: { postlikedBy: userId },
        $inc: { likeCounts: 1 },
      },
      {
        new: true,
      }
    );
  }
  async UnlikePost(postId: string, userId: string) {
    return PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { postlikes: userId },
        $inc: { likeCounts: -1 },
      },
      { new: true }
    );
  }
}
