import z from "zod";

export const PostSaveSchema = z.object({
  userId: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  postImage: z.string().optional(),
  category: z.string().optional(),
  // createdAt: z.date().optional(),
});

export const PostUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string(),
});
export const AnswerSchema = z.object({
  userId: z.string().optional(),
  username: z.string().optional(),
  answerSchema: z.string().min(1, { message: "Answer cannot be empty" }),
  answerlikedBy: z.array(z.string()).optional(),
  likeCounts: z.number().default(0),
});
