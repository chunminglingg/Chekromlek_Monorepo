import { IPost } from "@post/database/model/post.model";
import { PostRepository } from "@post/database/repository/post.repository";
import { logger } from "@post/utils/logger";

export class PostService {
    private postRepo: PostRepository;
    constructor() {
        this.postRepo = new PostRepository();
    }
    async createPost(post: IPost & { userId: string}) {
        try {
            const newPost = await this.postRepo.createPost(post);
            return newPost;
        } catch (error) {
            logger.error(`Create() method error: ${error}`)
        }
    }

    async updatePost (id: string , update: IPost) {
        try {
            return await this.postRepo.updatePost({id , update: update});
        } catch (error) {
            logger.error(`Update() method error: ${error}`)
            throw error;
        }
    }

}