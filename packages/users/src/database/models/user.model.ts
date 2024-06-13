import mongoose from 'mongoose';

export interface IUser {
  authId?: string;
  username?: string;
  email?: string;
  profile?: string;
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
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
    username: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    profile: { type: String , default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1718247335~exp=1718250935~hmac=47e9e0fe21830e0cc641a0473b46d5e995e1c5fc661e6c3c76a2d47fc19253ca&w=740" },
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    bio: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'other'] },
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
        delete ret.authId;
        delete ret.__v;
      },
    },
  },
);

export const UserModel = mongoose.model('User', userSchema);
