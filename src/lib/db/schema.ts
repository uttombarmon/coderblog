import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
export const userRoleEnum = pgEnum("user_role", ["guest", "author", "admin"]);
export const user = pgTable("user", {
  id: text("id").primaryKey().unique().notNull(),
  username: text("username").notNull().unique(),
  fullName: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: userRoleEnum("role").default("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
export const postStatusEnum = pgEnum("post_status", ["draft", "published"]);
export const post = pgTable("post", {
  id: text("id").primaryKey(),
  authorId: text("author_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  summary: text("summary"),
  status: text("status").default("draft").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
export const comment = pgTable("comment", {
  id: text("id").primaryKey(),

  postId: text("post_id")
    .notNull()
    .references(() => post.id, { onDelete: "cascade" }),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  parentId: text("parent_id").references((): any => comment.id, {
    onDelete: "cascade",
  }),

  content: text("content").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const postLike = pgTable("post_like", {
  id: text("id").primaryKey(),

  postId: text("post_id")
    .references(() => post.id, { onDelete: "cascade" })
    .notNull(),

  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const postDislike = pgTable("post_dislike", {
  id: text("id").primaryKey(),

  postId: text("post_id")
    .references(() => post.id, { onDelete: "cascade" })
    .notNull(),

  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const commentLike = pgTable("comment_like", {
  id: text("id").primaryKey(),

  commentId: text("comment_id")
    .references(() => comment.id, { onDelete: "cascade" })
    .notNull(),

  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// relationships
export const postRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),

  comments: many(comment),
  likes: many(postLike),
  dislikes: many(postDislike),
}));
export const commentRelations = relations(comment, ({ one, many }) => ({
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),

  author: one(user, {
    fields: [comment.userId],
    references: [user.id],
  }),

  parent: one(comment, {
    fields: [comment.parentId],
    references: [comment.id],
  }),

  replies: many(comment),
}));

export const postLikeRelations = relations(postLike, ({ one }) => ({
  post: one(post, {
    fields: [postLike.postId],
    references: [post.id],
  }),
  user: one(user, {
    fields: [postLike.userId],
    references: [user.id],
  }),
}));
export const postDislikeRelations = relations(postDislike, ({ one }) => ({
  post: one(post, {
    fields: [postDislike.postId],
    references: [post.id],
  }),
  user: one(user, {
    fields: [postDislike.userId],
    references: [user.id],
  }),
}));
export const commentLikeRelations = relations(commentLike, ({ one }) => ({
  comment: one(comment, {
    fields: [commentLike.commentId],
    references: [comment.id],
  }),
  user: one(user, {
    fields: [commentLike.userId],
    references: [user.id],
  }),
}));

export type Post = InferSelectModel<typeof post>;
export type NewPost = InferInsertModel<typeof post>;
export type Comment = InferSelectModel<typeof comment>;
export type NewComment = InferInsertModel<typeof comment>;
export type PostLike = InferSelectModel<typeof postLike>;
export type NewPostLike = InferInsertModel<typeof postLike>;
export type PostDislike = InferSelectModel<typeof postDislike>;
export type NewPostDislike = InferInsertModel<typeof postDislike>;
export type CommentLike = InferSelectModel<typeof commentLike>;
export type NewCommentLike = InferInsertModel<typeof commentLike>;
export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;
export type Session = InferSelectModel<typeof session>;
export type NewSession = InferInsertModel<typeof session>;
export type Account = InferSelectModel<typeof account>;
export type NewAccount = InferInsertModel<typeof account>;
export type Verification = InferSelectModel<typeof verification>;
export type NewVerification = InferInsertModel<typeof verification>;
