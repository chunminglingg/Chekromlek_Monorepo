import mongoose from "mongoose";
import { IAnswer, IPost } from "../@types/post.interface";
const convertToCambodiaTime = (date: Date): string => {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Phnom_Penh",
  });
};
const AnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: mongoose.Schema.Types.String, ref: "User" },
  profile: { type: mongoose.Schema.Types.String, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
  answerlikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  answer: { type: String },
  likeCounts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const getElapsedTime = (date: Date): string => {
  const now = new Date();
  const elapsedTime = now.getTime() - new Date(date).getTime();

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};

AnswerSchema.virtual("elapsedTime").get(function (this: IAnswer) {
  return getElapsedTime(this.createdAt as Date);
});

AnswerSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.userId;
    delete ret.__v;
    if (ret.createdAt) {
      ret.createdAt = convertToCambodiaTime(ret.createdAt);
      ret.elapsedTime = getElapsedTime(ret.createdAt);
    }
  },
});
const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: mongoose.Schema.Types.String, ref: "User" },
    title: { type: String, required: true },
    description: { type: String},
    postImage: { type: String },
    category: {
      type: String,
      enum: [
        "General Knowledge",
        "Mental Consultant",
        "Technology",
        "Mathematic",
        "Physical",
        "Biology",
        "Chemistry",
        "Writing",
        "History",
        "English",
      ],
    },
    postlikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likeCounts: { type: Number, default: 0 },
    answers: { type: [AnswerSchema], default: [] },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.userId;
        delete ret.__v;
        if (ret.createdAt) {
          ret.createdAt = convertToCambodiaTime(ret.createdAt);
          ret.elapsedTime = getElapsedTime(ret.createdAt);
        }
        if (ret.answers) {
          ret.answers = ret.answers.map((answer: IAnswer) => ({
            ...answer,
            createdAt: answer.createdAt
              ? convertToCambodiaTime(answer.createdAt)
              : undefined,
            elapsedTime: answer.createdAt
              ? getElapsedTime(answer.createdAt)
              : undefined,
          }));
        }
      },
    },
  }
);
PostSchema.virtual("elapsedTime").get(function (this: IPost) {
  return getElapsedTime(this.createdAt as Date);
});

export const PostModel = mongoose.model("Post", PostSchema);
