export interface PostTypesRepo extends UserTypes{
    userId?: string;
    username?: string;
    profile?: string;
    title?: string;
    description?: string;
    postImage?: string;
    category?: string;
    createdAt?: Date;
}

export interface UserTypes {
    _id?: string;
    username?: string;
    email?: string;
    profile?: string;
    favorites?: string[];
    questions?: string[];
    bio?: string;
    work?: string;
    answers?: number;
    posts?: number;
    gender?: string;
    createdAt?: Date | string;
}