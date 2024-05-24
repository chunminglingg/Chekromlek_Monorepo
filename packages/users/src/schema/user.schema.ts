import { z } from 'zod';

export const UserSaveSchema = z.object({
  userId: z.string().optional(),
  username: z.string().optional(),
  favorites: z.array(z.string()).optional(),
  email: z.string().email().optional(),
  questions: z.array(z.string()).optional(),
  profile: z.string().optional(),
  bio: z.string().optional(),
  work: z.array(z.string()).optional(),
  answers: z.number().optional(),
  posts: z.number().optional(),
  gender: z.string().optional(),
  createdAt: z.date().optional(),
});

export const UserUpdateSchema = z.object({
  username: z.string(),
  profile: z.string().optional(),
  bio: z.string().optional(),
  work: z.array(z.string()).optional(),
  gender: z.string().optional(),
});
