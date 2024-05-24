import z from "zod"

export const PostSaveSchema = z.object({
    userId: z.string().optional(),
    title: z.string(),
    description: z.string(),
    postImage: z.string().optional(),
    category: z.string(),
    createdAt: z.date().optional(),
})

export const PostUpdateSchema = z.object({
    title: z.string().optional(),
    description: z.string(),
})