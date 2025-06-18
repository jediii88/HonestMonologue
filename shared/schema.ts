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

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  animePosts: many(animePosts, { relationName: "author" }),
  approvedPosts: many(animePosts, { relationName: "approver" }),
  reviews: many(reviews),
  favorites: many(favorites),
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
