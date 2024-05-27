import mongoose from "mongoose";


const PostCard = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: mongoose.Schema.Types.String, ref: "User" },
    title: { type: String, required: true },
    descriptions: { type: String, required: true },
    postImage: { type: String },
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
    Date: {
      startDate: Date,
      endDate: Date,
      startTime: String,
      endTime: String,
    },
    like: { type: Number, default: 0 },
    isSave: { type: Boolean, default: false },
    createdAt: { type: Date },
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
