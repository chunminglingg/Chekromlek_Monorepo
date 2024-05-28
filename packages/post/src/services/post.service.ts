import { postDetail } from "@post/database/@types/post.interface";
import { postRepository } from "@post/database/repositories/post.repositories";
import APIError from "@post/errors/api-error";
import { StatusCode } from "@post/utils/const";
import { logger } from "@post/utils/logger";

export class PostService {
    private postRepo: postRepository;
    constructor() {
        this.postRepo = new postRepository();
    }
    async createPost(postDetail : postDetail) {
        try {
            const newPost = await this.postRepo.createPost(postDetail);
            return newPost;
        } catch (error) {
            logger.error(`Create() method error in service : ${error}`)
        }
    }

    
    async findPostById (id: string) {
        try {
            const findPostByid = await this.postRepo.findPost(id);
            if (!findPostByid) {
                throw new APIError(`Post not found in service` , StatusCode.NotFound)
            }
            return findPostByid;
        } catch (error) {
            logger.error(`findPostbyId() method error: ${error}`)
            throw error;
        }
    }
    
    async updatePost (id: string , newUpdate: postDetail) {
        try {
            const findExistingPost = await this.postRepo.findPost(id);
            
            if (!findExistingPost) {
                throw new APIError(`Post not found` , StatusCode.NotFound)
            }
            const updatedPost = await this.postRepo.updatePost(id, newUpdate);
            return updatedPost;
        } catch (error) {
            logger.error(`Update() method error: ${error}`)
            throw error;
        }
    }
}