import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string().min(1),

  postId: z.string().min(1),

  userId: z.string().min(1),

  parentId: z.string().optional(),

  content: z.string().min(1),

  createdAt: z.date(),
});

export const CreateCommentSchema = CommentSchema.pick({
  postId: true,
  userId: true,
  parentId: true,
  content: true,
});

export const UpdateCommentSchema = z.object({
  content: z.string().min(1),
});

export type Comment = z.infer<typeof CommentSchema>;
export type CreateCommentInput = z.infer<typeof CreateCommentSchema>;
export type UpdateCommentInput = z.infer<typeof UpdateCommentSchema>;
