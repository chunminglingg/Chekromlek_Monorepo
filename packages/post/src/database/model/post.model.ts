import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: mongoose.Schema.Types.String, ref: "User" },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
  answerlikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likeCounts: { type: Number, default: 0 },
});
const PostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: mongoose.Schema.Types.String, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    postImage: { type: String, default: "jpg" },
    category: {
      type: String,
      enum: [
        "Genaral Knowledge",
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
      },
    },
  }
);

export const PostModel = mongoose.model("Post", PostSchema);
