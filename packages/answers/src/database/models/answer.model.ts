import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    answer: { type: String, require: true },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
  },
);

export const AnswerModel = mongoose.model('Answer', answerSchema);
