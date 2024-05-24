import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(2, "title name must be at least 2 characters"),
  description: z.string().min(2, "username must be at least 2 characters"),
  // image: z.preprocess((arg) => {
  //   if (typeof arg == "string") return new Date(arg);
  //   return arg;
  // }, z.date()),
});
