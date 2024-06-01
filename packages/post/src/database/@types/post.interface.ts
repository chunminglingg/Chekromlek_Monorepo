import mongoose from "mongoose";
export interface IAnswer {
  answer?: string;
  // likes?: Number;
}
export interface postDetail {
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
  like?: number;
  isSave?: boolean;
  answer?: string;
  createdAt?: Date;
  answers?: IAnswer[];
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
