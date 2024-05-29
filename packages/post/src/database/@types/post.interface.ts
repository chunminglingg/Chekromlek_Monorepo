import mongoose from "mongoose";
export interface IAnswer {
  userId?: mongoose.Types.ObjectId;
  postId?: mongoose.Types.ObjectId;
  username?: mongoose.Types.ObjectId;
  answer?: string;
}
export interface postDetail {
  userId?: mongoose.Types.ObjectId;
  username?: mongoose.Types.ObjectId;
  title?: string;
  description?: string;
  postImage?: string;
  category?:
    | "General Knowledge"
    | "Mental Consultant"
    | "Technology"
    | "Mathematic"
    | "Physical"
    | "Biology"
    | "Chemistry"
    | "Writing"
    | "History"
    | "English";
  like?: number;
  isSave?: boolean;
  createdAt?: Date;
  answers: IAnswer[];
}
export enum PostCategory {
  GeneralKnowledge = "General Knowledge",
  MentalConsultant = "Mental Consultant",
  Technology = "Technology",
  Mathematic = "Mathematic",
  Physical = "Physical",
  Biology = "Biology",
  Chemistry = "Chemistry",
  Writing = "Writing",
  History = "History",
  English = "English",
}
