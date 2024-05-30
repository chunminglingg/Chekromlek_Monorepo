import { IAnswer, postDetail } from "@post/database/@types/post.interface";
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
  async createPost(postDetail: postDetail) {
    try {
      const newPost = await this.postRepo.createPost(postDetail);
      return newPost;
    } catch (error) {
      logger.error(`Create() method error in service : ${error}`);
      throw error;
    }
  }

  async createAnswer(id: string, answer: IAnswer) {
    try {
      // const postObjectId = new Types.ObjectId(id);

      const post = await this.postRepo.findAnswerById(id);
      if (!post) {
        throw new CustomError("Post not found", StatusCode.NotFound);
      }
      
      const updatedPost = await this.postRepo.addAnswerToPost(id, answer);
      if (!updatedPost) {
        throw new CustomError(
          "Failed to add answer to post",
          StatusCode.InternalServerError
        );
      }

      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id: string, newUpdate: postDetail) {
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
}
