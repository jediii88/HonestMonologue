import {
  users,
  animePosts,
  tags,
  animePostTags,
  reviews,
  favorites,
  type User,
  type UpsertUser,
  type AnimePost,
  type InsertAnimePost,
  type Tag,
  type InsertTag,
  type Review,
  type InsertReview,
  type AnimePostWithDetails,
  type ReviewWithAuthor,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, and, sql, ilike, inArray } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Anime operations
  getAllAnimePosts(limit?: number, offset?: number, status?: string): Promise<AnimePostWithDetails[]>;
  getAnimePost(id: number): Promise<AnimePostWithDetails | undefined>;
  createAnimePost(post: InsertAnimePost, authorId: string, tagIds: number[]): Promise<AnimePost>;
  updateAnimePost(id: number, post: Partial<InsertAnimePost>): Promise<AnimePost | undefined>;
  deleteAnimePost(id: number): Promise<boolean>;
  approveAnimePost(id: number, approverId: string): Promise<AnimePost | undefined>;
  rejectAnimePost(id: number): Promise<AnimePost | undefined>;
  incrementViewCount(id: number): Promise<void>;
  searchAnimePosts(query: string, tagIds?: number[]): Promise<AnimePostWithDetails[]>;
  
  // Tag operations
  getAllTags(): Promise<Tag[]>;
  createTag(tag: InsertTag): Promise<Tag>;
  getTagsByNames(names: string[]): Promise<Tag[]>;
  
  // Review operations
  getReviewsForAnime(animePostId: number): Promise<ReviewWithAuthor[]>;
  createReview(review: InsertReview, authorId: string): Promise<Review>;
  updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined>;
  deleteReview(id: number, authorId: string): Promise<boolean>;
  
  // Favorite operations
  toggleFavorite(userId: string, animePostId: number): Promise<boolean>;
  getUserFavorites(userId: string): Promise<AnimePostWithDetails[]>;
  
  // Admin operations
  getPendingAnimePosts(): Promise<AnimePostWithDetails[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Anime operations
  async getAllAnimePosts(limit = 20, offset = 0, status = "approved"): Promise<AnimePostWithDetails[]> {
    const postsWithDetails = await db
      .select({
        animePost: animePosts,
        author: users,
        tag: tags,
      })
      .from(animePosts)
      .leftJoin(users, eq(animePosts.authorId, users.id))
      .leftJoin(animePostTags, eq(animePosts.id, animePostTags.animePostId))
      .leftJoin(tags, eq(animePostTags.tagId, tags.id))
      .where(eq(animePosts.status, status))
      .orderBy(desc(animePosts.createdAt))
      .limit(limit)
      .offset(offset);

    return this.groupAnimePostsWithDetails(postsWithDetails);
  }

  async getAnimePost(id: number): Promise<AnimePostWithDetails | undefined> {
    const postsWithDetails = await db
      .select({
        animePost: animePosts,
        author: users,
        tag: tags,
      })
      .from(animePosts)
      .leftJoin(users, eq(animePosts.authorId, users.id))
      .leftJoin(animePostTags, eq(animePosts.id, animePostTags.animePostId))
      .leftJoin(tags, eq(animePostTags.tagId, tags.id))
      .where(eq(animePosts.id, id));

    const grouped = this.groupAnimePostsWithDetails(postsWithDetails);
    return grouped[0];
  }

  async createAnimePost(post: InsertAnimePost, authorId: string, tagIds: number[]): Promise<AnimePost> {
    const [createdPost] = await db
      .insert(animePosts)
      .values({ ...post, authorId })
      .returning();

    // Associate tags
    if (tagIds.length > 0) {
      await db.insert(animePostTags).values(
        tagIds.map(tagId => ({ animePostId: createdPost.id, tagId }))
      );
    }

    return createdPost;
  }

  async updateAnimePost(id: number, post: Partial<InsertAnimePost>): Promise<AnimePost | undefined> {
    const [updatedPost] = await db
      .update(animePosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(animePosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteAnimePost(id: number): Promise<boolean> {
    const result = await db.delete(animePosts).where(eq(animePosts.id, id));
    return result.rowCount > 0;
  }

  async approveAnimePost(id: number, approverId: string): Promise<AnimePost | undefined> {
    const [approvedPost] = await db
      .update(animePosts)
      .set({ status: "approved", approvedBy: approverId, updatedAt: new Date() })
      .where(eq(animePosts.id, id))
      .returning();
    return approvedPost;
  }

  async rejectAnimePost(id: number): Promise<AnimePost | undefined> {
    const [rejectedPost] = await db
      .update(animePosts)
      .set({ status: "rejected", updatedAt: new Date() })
      .where(eq(animePosts.id, id))
      .returning();
    return rejectedPost;
  }

  async incrementViewCount(id: number): Promise<void> {
    await db
      .update(animePosts)
      .set({ viewCount: sql`${animePosts.viewCount} + 1` })
      .where(eq(animePosts.id, id));
  }

  async searchAnimePosts(query: string, tagIds?: number[]): Promise<AnimePostWithDetails[]> {
    let queryBuilder = db
      .select({
        animePost: animePosts,
        author: users,
        tag: tags,
      })
      .from(animePosts)
      .leftJoin(users, eq(animePosts.authorId, users.id))
      .leftJoin(animePostTags, eq(animePosts.id, animePostTags.animePostId))
      .leftJoin(tags, eq(animePostTags.tagId, tags.id))
      .where(
        and(
          eq(animePosts.status, "approved"),
          ilike(animePosts.title, `%${query}%`)
        )
      );

    if (tagIds && tagIds.length > 0) {
      queryBuilder = queryBuilder.where(
        and(
          eq(animePosts.status, "approved"),
          ilike(animePosts.title, `%${query}%`),
          inArray(tags.id, tagIds)
        )
      );
    }

    const postsWithDetails = await queryBuilder.orderBy(desc(animePosts.createdAt));
    return this.groupAnimePostsWithDetails(postsWithDetails);
  }

  // Tag operations
  async getAllTags(): Promise<Tag[]> {
    return await db.select().from(tags).orderBy(asc(tags.name));
  }

  async createTag(tag: InsertTag): Promise<Tag> {
    const [createdTag] = await db.insert(tags).values(tag).returning();
    return createdTag;
  }

  async getTagsByNames(names: string[]): Promise<Tag[]> {
    return await db.select().from(tags).where(inArray(tags.name, names));
  }

  // Review operations
  async getReviewsForAnime(animePostId: number): Promise<ReviewWithAuthor[]> {
    const reviewsWithAuthors = await db
      .select({
        review: reviews,
        author: users,
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.authorId, users.id))
      .where(eq(reviews.animePostId, animePostId))
      .orderBy(desc(reviews.createdAt));

    return reviewsWithAuthors.map(row => ({
      ...row.review,
      author: row.author!,
    }));
  }

  async createReview(review: InsertReview, authorId: string): Promise<Review> {
    const [createdReview] = await db
      .insert(reviews)
      .values({ ...review, authorId })
      .returning();
    return createdReview;
  }

  async updateReview(id: number, review: Partial<InsertReview>): Promise<Review | undefined> {
    const [updatedReview] = await db
      .update(reviews)
      .set({ ...review, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();
    return updatedReview;
  }

  async deleteReview(id: number, authorId: string): Promise<boolean> {
    const result = await db
      .delete(reviews)
      .where(and(eq(reviews.id, id), eq(reviews.authorId, authorId)));
    return result.rowCount > 0;
  }

  // Favorite operations
  async toggleFavorite(userId: string, animePostId: number): Promise<boolean> {
    const existing = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.animePostId, animePostId)));

    if (existing.length > 0) {
      await db
        .delete(favorites)
        .where(and(eq(favorites.userId, userId), eq(favorites.animePostId, animePostId)));
      return false;
    } else {
      await db.insert(favorites).values({ userId, animePostId });
      return true;
    }
  }

  async getUserFavorites(userId: string): Promise<AnimePostWithDetails[]> {
    const favoritesWithDetails = await db
      .select({
        animePost: animePosts,
        author: users,
        tag: tags,
      })
      .from(favorites)
      .leftJoin(animePosts, eq(favorites.animePostId, animePosts.id))
      .leftJoin(users, eq(animePosts.authorId, users.id))
      .leftJoin(animePostTags, eq(animePosts.id, animePostTags.animePostId))
      .leftJoin(tags, eq(animePostTags.tagId, tags.id))
      .where(eq(favorites.userId, userId))
      .orderBy(desc(favorites.createdAt));

    return this.groupAnimePostsWithDetails(favoritesWithDetails);
  }

  // Admin operations
  async getPendingAnimePosts(): Promise<AnimePostWithDetails[]> {
    const postsWithDetails = await db
      .select({
        animePost: animePosts,
        author: users,
        tag: tags,
      })
      .from(animePosts)
      .leftJoin(users, eq(animePosts.authorId, users.id))
      .leftJoin(animePostTags, eq(animePosts.id, animePostTags.animePostId))
      .leftJoin(tags, eq(animePostTags.tagId, tags.id))
      .where(eq(animePosts.status, "pending"))
      .orderBy(asc(animePosts.createdAt));

    return this.groupAnimePostsWithDetails(postsWithDetails);
  }

  // Helper method to group anime posts with their details
  private async groupAnimePostsWithDetails(rows: any[]): Promise<AnimePostWithDetails[]> {
    const postsMap = new Map<number, AnimePostWithDetails>();

    for (const row of rows) {
      const post = row.animePost;
      if (!postsMap.has(post.id)) {
        // Get review stats
        const reviewStats = await db
          .select({
            averageRating: sql<number>`COALESCE(AVG(${reviews.rating}), 0)`,
            reviewCount: sql<number>`COUNT(${reviews.id})`,
          })
          .from(reviews)
          .where(eq(reviews.animePostId, post.id));

        postsMap.set(post.id, {
          ...post,
          author: row.author,
          tags: [],
          reviews: [],
          averageRating: parseFloat(reviewStats[0]?.averageRating || "0"),
          reviewCount: parseInt(reviewStats[0]?.reviewCount || "0"),
        });
      }

      const animePostWithDetails = postsMap.get(post.id)!;
      if (row.tag && !animePostWithDetails.tags.find(t => t.id === row.tag.id)) {
        animePostWithDetails.tags.push(row.tag);
      }
    }

    return Array.from(postsMap.values());
  }
}

export const storage = new DatabaseStorage();
