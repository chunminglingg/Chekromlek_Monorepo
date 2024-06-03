import z from "zod";

export const PostSaveSchema = z.object({
  userId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  postImage: z.string().optional(),
  category: z.string(),
  createdAt: z.date().optional(),
});

export const PostUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string(),
});
export const AnswerSchema = z.object({
  userId: z.string().optional(),
  username: z.string().optional(),
  answer: z.string(),
  answerlikedBy: z.array(z.string()).optional(), // Make it optional
  likeCounts: z.number().default(0),
});
