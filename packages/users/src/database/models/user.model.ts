import getConfig from '@users/utils/config';
import mongoose from 'mongoose';

export interface IUser {
  userId?: string;
  username?: string;
  email?: string;
  profile?: string | null; // Use string to store file path or URL
  saves?: string[];
  post?: string[];
  bio?: string;
  work?: string;
  answers?: number;
  posts?: number;
  gender?: string;
  createdAt?: Date | string;
}

const userSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
    username: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    profile: {
      type: String,
      default: getConfig().profileImage,
    },
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    bio: { type: String, default: 'bio' },
    gender: { type: String, enum: ['male', 'Female', 'other'] },
    work: {
      type: String,
      default: 'Student',
      enum: ['Student', 'General', 'Developer'],
    },
    answers: { type: Number, default: 0 },
    posts: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.userId;
        delete ret.__v;
      },
    },
  },
);

export const UserModel = mongoose.model('User', userSchema);
