import mongoose from "mongoose";
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
