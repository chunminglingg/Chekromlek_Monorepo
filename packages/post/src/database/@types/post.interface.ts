import mongoose from "mongoose";
export interface IAnswer {
  answer?: string;
  likeCounts?: number;
  answerlikedBy?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  elapsedTime?: string;
}
export interface IPost {
  _id?: string;
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
  isSave?: boolean;
  likeCounts?: number;
  postlikedBy?: mongoose.Types.ObjectId[];
  answer?: string;
  createdAt?: Date;
  answers?: IAnswer[];
  elapsedTime?: string;
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

export interface QueryParams {
  id?: string;
  username?: string;
  category?: string;
  title?: string;
  page: string;
  limit: string;
}
