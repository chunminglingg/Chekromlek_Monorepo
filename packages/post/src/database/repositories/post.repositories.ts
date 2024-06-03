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
  async FindPostUser(id: string) {
    try {
      return await PostModel.findOne({ id });
    } catch (error) {
      throw error;
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
  async deletePost(postId: string) {
    try {
      return await PostModel.findByIdAndDelete(postId);
    } catch (error: unknown) {
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
      logger.debug(
        `Liking answer with postId: ${postId}, answerId: ${answerId}, userId: ${userId}`
      );
      const result = await PostModel.findOneAndUpdate(
        {
          _id: postId,
          "answers._id": answerId,
          "answers.answerlikedBy": { $ne: userId },
        },
        {
          $inc: { "answers.$.likeCounts": 1 },
          $addToSet: { "answers.$.answerlikedBy": userId },
        },
        { new: true }
      );

      if (!result) {
        logger.debug(
          `LikeAnswer failed for postId: ${postId}, answerId: ${answerId}, userId: ${userId}`
        );
        throw new Error(
          "Post or answer not found or user already liked the answer."
        );
      }

      logger.debug(
        `Answer liked successfully for postId: ${postId}, answerId: ${answerId}, userId: ${userId}`
      );
      return result;
    } catch (error) {
      logger.error("Repository like method() error", error);
      throw error;
    }
  }
  async UnlikeAnswer(postId: string, answerId: string, userId: string) {
    try {
      // Check if the post, answer, and userId condition are met
      const post = await PostModel.findOne({
        _id: postId,
        "answers._id": answerId,
        "answers.answerlikedBy": userId,
      });

      if (!post) {
        throw new Error(
          "Post or answer not found or user didn't like the answer."
        );
      }
      // Proceed to unlike the answer
      const updatedPost = await PostModel.findOneAndUpdate(
        {
          _id: postId,
          "answers._id": answerId,
          "answers.answerlikedBy": userId,
        },
        {
          $inc: { "answers.$.likeCounts": -1 },
          $pull: { "answers.$.answerlikedBy": userId },
        },
        { new: true }
      );

      if (!updatedPost) {
        throw new Error(
          "Post or answer not found or user didn't like the answer."
        );
      }

      logger.debug(
        `Answer unliked successfully for postId: ${postId}, answerId: ${answerId}, userId: ${userId}`
      );
      logger.debug(`Post after unlike: ${JSON.stringify(updatedPost)}`);
      return updatedPost;
    } catch (error) {
      logger.error("Repository Unlike method() error", error);
      throw error;
    }
  }

  async LikePost(postId: string, userId: string) {
    const post = await PostModel.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.postlikedBy.includes(userId)) {
      throw new Error("User has already liked this post");
    }

    return PostModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: { postlikedBy: userId },
        $inc: { likeCounts: 1 },
      },
      {
        new: true,
      }
    );
  }

  async UnlikePost(postId: string, userId: string) {
    const post = await PostModel.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }
    
    if (!post.postlikedBy.includes(userId)) {
      throw new Error("User has not liked this post");
    }

    return PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { postlikedBy: userId },
        $inc: { likeCounts: -1 },
      },
      { new: true }
    );
  }
}
