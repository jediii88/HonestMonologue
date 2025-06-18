import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (mandatory for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tags table
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  color: varchar("color", { length: 7 }).default("#6366F1"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Anime posts table
export const animePosts = pgTable("anime_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 500 }),
  year: integer("year"),
  type: varchar("type", { length: 20 }).notNull(), // TV, Movie, OVA, etc.
  studio: varchar("studio", { length: 100 }),
  status: varchar("status", { length: 20 }).default("pending"), // pending, approved, rejected
  authorId: varchar("author_id").notNull().references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Anime tags junction table
export const animePostTags = pgTable(
  "anime_post_tags",
  {
    animePostId: integer("anime_post_id").notNull().references(() => animePosts.id, { onDelete: "cascade" }),
    tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.animePostId, table.tagId] })]
);

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  animePostId: integer("anime_post_id").notNull().references(() => animePosts.id, { onDelete: "cascade" }),
  authorId: varchar("author_id").notNull().references(() => users.id),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  title: varchar("title", { length: 255 }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Favorites table
export const favorites = pgTable(
  "favorites",
  {
    userId: varchar("user_id").notNull().references(() => users.id),
    animePostId: integer("anime_post_id").notNull().references(() => animePosts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.animePostId] })]
);

// Forums table
export const forums = pgTable("forums", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  isPrivate: boolean("is_private").default(false),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Forum posts table
export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  forumId: integer("forum_id").notNull().references(() => forums.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  authorId: varchar("author_id").notNull().references(() => users.id),
  isPinned: boolean("is_pinned").default(false),
  isLocked: boolean("is_locked").default(false),
  viewCount: integer("view_count").default(0),
  replyCount: integer("reply_count").default(0),
  lastReplyAt: timestamp("last_reply_at"),
  lastReplyBy: varchar("last_reply_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Forum replies table
export const forumReplies = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => forumPosts.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  authorId: varchar("author_id").notNull().references(() => users.id),
  parentReplyId: integer("parent_reply_id").references(() => forumReplies.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Direct messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  receiverId: varchar("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Forum memberships table
export const forumMemberships = pgTable(
  "forum_memberships",
  {
    forumId: integer("forum_id").notNull().references(() => forums.id, { onDelete: "cascade" }),
    userId: varchar("user_id").notNull().references(() => users.id),
    role: varchar("role", { length: 20 }).default("member"), // member, moderator, admin
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.forumId, table.userId] })]
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  animePosts: many(animePosts, { relationName: "author" }),
  approvedPosts: many(animePosts, { relationName: "approver" }),
  reviews: many(reviews),
  favorites: many(favorites),
  createdForums: many(forums),
  forumPosts: many(forumPosts),
  forumReplies: many(forumReplies),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  forumMemberships: many(forumMemberships),
}));

export const animePostsRelations = relations(animePosts, ({ one, many }) => ({
  author: one(users, {
    fields: [animePosts.authorId],
    references: [users.id],
    relationName: "author",
  }),
  approver: one(users, {
    fields: [animePosts.approvedBy],
    references: [users.id],
    relationName: "approver",
  }),
  tags: many(animePostTags),
  reviews: many(reviews),
  favorites: many(favorites),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  animePosts: many(animePostTags),
}));

export const animePostTagsRelations = relations(animePostTags, ({ one }) => ({
  animePost: one(animePosts, {
    fields: [animePostTags.animePostId],
    references: [animePosts.id],
  }),
  tag: one(tags, {
    fields: [animePostTags.tagId],
    references: [tags.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  animePost: one(animePosts, {
    fields: [reviews.animePostId],
    references: [animePosts.id],
  }),
  author: one(users, {
    fields: [reviews.authorId],
    references: [users.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  animePost: one(animePosts, {
    fields: [favorites.animePostId],
    references: [animePosts.id],
  }),
}));

// Forum relations
export const forumsRelations = relations(forums, ({ one, many }) => ({
  creator: one(users, {
    fields: [forums.createdBy],
    references: [users.id],
  }),
  posts: many(forumPosts),
  memberships: many(forumMemberships),
}));

export const forumPostsRelations = relations(forumPosts, ({ one, many }) => ({
  forum: one(forums, {
    fields: [forumPosts.forumId],
    references: [forums.id],
  }),
  author: one(users, {
    fields: [forumPosts.authorId],
    references: [users.id],
  }),
  lastReplyUser: one(users, {
    fields: [forumPosts.lastReplyBy],
    references: [users.id],
  }),
  replies: many(forumReplies),
}));

export const forumRepliesRelations = relations(forumReplies, ({ one, many }) => ({
  post: one(forumPosts, {
    fields: [forumReplies.postId],
    references: [forumPosts.id],
  }),
  author: one(users, {
    fields: [forumReplies.authorId],
    references: [users.id],
  }),
  parentReply: one(forumReplies, {
    fields: [forumReplies.parentReplyId],
    references: [forumReplies.id],
  }),
  childReplies: many(forumReplies),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "sentMessages",
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
    relationName: "receivedMessages",
  }),
}));

export const forumMembershipsRelations = relations(forumMemberships, ({ one }) => ({
  forum: one(forums, {
    fields: [forumMemberships.forumId],
    references: [forums.id],
  }),
  user: one(users, {
    fields: [forumMemberships.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertAnimePostSchema = createInsertSchema(animePosts).omit({
  id: true,
  status: true,
  authorId: true,
  approvedBy: true,
  viewCount: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTagSchema = createInsertSchema(tags).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});

// Forum schemas
export const insertForumSchema = createInsertSchema(forums).omit({
  id: true,
  createdBy: true,
  createdAt: true,
  updatedAt: true,
});

export const insertForumPostSchema = createInsertSchema(forumPosts).omit({
  id: true,
  authorId: true,
  replyCount: true,
  lastReplyAt: true,
  lastReplyBy: true,
  createdAt: true,
  updatedAt: true,
});

export const insertForumReplySchema = createInsertSchema(forumReplies).omit({
  id: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  senderId: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type AnimePost = typeof animePosts.$inferSelect;
export type InsertAnimePost = z.infer<typeof insertAnimePostSchema>;
export type Tag = typeof tags.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Favorite = typeof favorites.$inferSelect;

// Forum types
export type Forum = typeof forums.$inferSelect;
export type InsertForum = z.infer<typeof insertForumSchema>;
export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type ForumReply = typeof forumReplies.$inferSelect;
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type ForumMembership = typeof forumMemberships.$inferSelect;

// Extended types for API responses
export type AnimePostWithDetails = AnimePost & {
  author: User;
  approver?: User;
  tags: Tag[];
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  isFavorited?: boolean;
};

export type ReviewWithAuthor = Review & {
  author: User;
};

export type ForumWithDetails = Forum & {
  creator: User;
  postCount: number;
  memberCount: number;
  lastPost?: ForumPost & { author: User };
  userRole?: string;
};

export type ForumPostWithDetails = ForumPost & {
  author: User;
  forum: Forum;
  lastReplyUser?: User;
};

export type ForumReplyWithDetails = ForumReply & {
  author: User;
  parentReply?: ForumReply & { author: User };
  childReplies?: ForumReplyWithDetails[];
};

export type MessageWithUsers = Message & {
  sender: User;
  receiver: User;
};

export type Conversation = {
  otherUser: User;
  lastMessage: Message;
  unreadCount: number;
};
