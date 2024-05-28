import mongoose from 'mongoose';

export interface IAnswer {
  userId: mongoose.Schema.Types.ObjectId;
  postId: mongoose.Schema.Types.ObjectId;
  username: mongoose.Schema.Types.ObjectId;
  answer: string;
}
