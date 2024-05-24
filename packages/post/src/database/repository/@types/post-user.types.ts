import { PostTypesRepo } from "@post/database/model/@types/Post-model.interface";

export interface createPostRepository {
    userId: string;
    title?: string;
    description?: string;
    postImage?: string;
    category?: string;
    createdAt?: Date;
}

export interface createPost extends PostTypesRepo {}

export interface updatePostRepository {
    title?: string;
    description?: string;
}