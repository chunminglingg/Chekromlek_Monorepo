import mongoose from "mongoose";
import { PostTypesRepo } from "./@types/Post-model.interface";
import { optional } from "zod";

export interface IPost {
  username?: string
  title: string;
  descriptions?: string;
  userId?: string;
  postImage?: string;
  category: string;
  createdAt?: Date;
}

const postModel = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: mongoose.Schema.Types.String, ref: "User"},
    title: { type: String, required: true },
    descriptions: { type: String, required: true },
    postImage: { type: String , optional},
    category: { type: String, required: true },
    createdAt: { type: Date, optional },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.userId;
        delete ret.__v;
      },
    },
  }
);

export const PostSchema = mongoose.model<PostTypesRepo> (
  "CreatePost", 
  postModel
)

