import mongoose from "mongoose";


const PostCard = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: mongoose.Schema.Types.String, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    postImage: { type: String , default: "jpg", },
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
    like: { type: Number, default: 0 },
    isSave: { type: Boolean, default: false },
    createdAt: { type: Date , default: Date.now()},
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

export const PostModel = mongoose.model(
  "PostModel",
  PostCard
);
