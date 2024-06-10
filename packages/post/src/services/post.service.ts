import { IAnswer, IPost } from "@post/database/@types/post.interface";
import { postRepository } from "@post/database/repositories/post.repositories";
import APIError from "@post/errors/api-error";
import CustomError from "@post/errors/customError";
import { StatusCode } from "@post/utils/const";
import { logger } from "@post/utils/logger";

export class PostService {
  private postRepo: postRepository;
  constructor() {
    this.postRepo = new postRepository();
  }
  async createPost(IPost: IPost) {
    try {
      const newPost = await this.postRepo.createPost(IPost);
      return newPost;
    } catch (error) {
      logger.error(`Create() method error in service : ${error}`);
      throw error;
    }
  }

  async createAnswer(postId: string, answer: IAnswer) {
    try {
      const post = await this.postRepo.findPost(postId);
      if (!post) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }

      const answerWithDefaultFields = {
        ...answer,
        answerlikedBy: [], // Ensure the field is initialized
      };

      post.answers.push(answerWithDefaultFields);
      const updatedPost = await post.save();

      if (!updatedPost) {
        throw new CustomError(
          "Failed to add answer to post",
          StatusCode.InternalServerError
        );
      }

      return updatedPost;
    } catch (error) {
      logger.error(`createAnswer() method error: ${error}`);
      throw error;
    }
  }
  async deletePost(postId: string) {
    try {
      const existingPost = await this.postRepo.findPost(postId);
      if (!existingPost) {
        throw new APIError("Post does not exist", StatusCode.NotFound);
      }
      return await this.postRepo.deletePost(postId);
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id: string, newUpdate: IPost) {
    try {
      const findExistingPost = await this.postRepo.findPost(id);
      if (!findExistingPost) {
        throw new APIError(`Post not found`, StatusCode.NotFound);
      }
      const updatedPost = await this.postRepo.updatePost(id, newUpdate);
      return updatedPost;
    } catch (error) {
      logger.error(`Update() method error: ${error}`);
      throw error;
    }
  }

  async findAllPost () {
    try {
      return await this.postRepo.findAllPost();
    } catch (error) {
      throw error;
    }
  }
  async findAnswerById(postId: string, answerId: string): Promise<any> {
    try {
      // Find the answer within the post
      const post = await this.postRepo.findAnswerById(postId);
      if (!post) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }

      const answer = post.answers.id(answerId);
      if (!answer) {
        throw new CustomError("Answer not found", StatusCode.NotFound);
      }

      return answer;
    } catch (error) {
      throw error;
    }
  }
  async findPostUser(id: string) {
    try {
      return await this.postRepo.FindPostUser(id);
    } catch (error) {
      throw error;
    }
  }

  async FindAllPost() {
    try {
      return await this.postRepo.FindAllPost();
    } catch (error) {
      console.error("Error fetching posts from database:", error);
      throw new APIError("Database query failed");
    }
  }
  async findPostById(id: string) {
    try {
      const findPostByid = await this.postRepo.findPost(id);
      if (!findPostByid) {
        throw new APIError(`Post not found`, StatusCode.NotFound);
      }
      return findPostByid;
    } catch (error) {
      logger.error(`findPostbyId() method error: ${error}`);
      throw error;
    }
  }
  // async findPostCategory(category: string){}
  async LikeAnswer(postId: string, answerId: string, userId: string) {
    try {
      const updatedPost = await this.postRepo.LikeAnswer(
        postId,
        answerId,
        userId
      );
      if (!updatedPost) {
        throw new CustomError(
          "Failed to like the answer",
          StatusCode.InternalServerError
        );
      }
      return updatedPost;
    } catch (error) {
      logger.error("Service Like method () error:", error);
      throw error;
    }
  }
  async UnlikeAnswer(postId: string, answerId: string, userId: string) {
    try {
      const updatedPost = await this.postRepo.UnlikeAnswer(
        postId,
        answerId,
        userId
      );
      if (!updatedPost) {
        throw new CustomError(
          "Failed to unlike the answer",
          StatusCode.InternalServerError
        );
      }
      return updatedPost;
    } catch (error) {
      logger.error("Service Unlike method () error:", error);
      throw error;
    }
  }
  async LikePost(postId: string, userId: string) {
    try {
      const updatedPost = await this.postRepo.LikePost(postId, userId);
      if (!updatedPost) {
        throw new CustomError(
          "Failed to like the post",
          StatusCode.InternalServerError
        );
      }
      return updatedPost;
    } catch (error) {
      logger.error("Service Like post method() error:", error);
      throw error;
    }
  }
  async UnlikePost(postId: string, userId: string) {
    try {
      const updatedPost = await this.postRepo.UnlikePost(postId, userId);
      if (!updatedPost) {
        throw new CustomError(
          "Failed to Unlike the post",
          StatusCode.InternalServerError
        );
      }
      return updatedPost;
    } catch (error) {
      logger.error("Service Unlike post method() error:", error);
      throw error;
    }
  }

  async savePost(postId: string) {
    try {
      await this.postRepo.updateSaveFlag(postId);
    } catch (error) {
      throw new APIError(`Failed to save post: ${error}`);
    }
  }
}
