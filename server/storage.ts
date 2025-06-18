import {
  users,
  animePosts,
  tags,
  animePostTags,
  reviews,
  favorites,
  forums,
  forumPosts,
  forumReplies,
  messages,
  forumMemberships,
  type User,
  type UpsertUser,
  type AnimePost,
  type InsertAnimePost,
  type Tag,
  type InsertTag,
  type Review,
  type InsertReview,
  type Forum,
  type InsertForum,
  type ForumPost,
  type InsertForumPost,
  type ForumReply,
  type InsertForumReply,
  type Message,
  type InsertMessage,
  type ForumMembership,
  type AnimePostWithDetails,
  type ReviewWithAuthor,
  type ForumWithDetails,
  type ForumPostWithDetails,
  type ForumReplyWithDetails,
  type MessageWithUsers,
  type Conversation,
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
  
  // Forum operations
  getAllForums(userId?: string): Promise<ForumWithDetails[]>;
  getForum(id: number, userId?: string): Promise<ForumWithDetails | undefined>;
  createForum(forum: InsertForum, creatorId: string): Promise<Forum>;
  updateForum(id: number, forum: Partial<InsertForum>): Promise<Forum | undefined>;
  deleteForum(id: number): Promise<boolean>;
  joinForum(forumId: number, userId: string, role?: string): Promise<boolean>;
  leaveForum(forumId: number, userId: string): Promise<boolean>;
  
  // Forum post operations
  getForumPosts(forumId: number, limit?: number, offset?: number): Promise<ForumPostWithDetails[]>;
  getForumPost(id: number): Promise<ForumPostWithDetails | undefined>;
  createForumPost(post: InsertForumPost, authorId: string): Promise<ForumPost>;
  updateForumPost(id: number, post: Partial<InsertForumPost>): Promise<ForumPost | undefined>;
  deleteForumPost(id: number): Promise<boolean>;
  pinForumPost(id: number): Promise<boolean>;
  lockForumPost(id: number): Promise<boolean>;
  incrementForumPostViews(id: number): Promise<void>;
  
  // Forum reply operations
  getForumReplies(postId: number): Promise<ForumReplyWithDetails[]>;
  createForumReply(reply: InsertForumReply, authorId: string): Promise<ForumReply>;
  updateForumReply(id: number, reply: Partial<InsertForumReply>): Promise<ForumReply | undefined>;
  deleteForumReply(id: number): Promise<boolean>;
  
  // Message operations
  getUserConversations(userId: string): Promise<Conversation[]>;
  getConversation(userId: string, otherUserId: string, limit?: number, offset?: number): Promise<MessageWithUsers[]>;
  sendMessage(message: InsertMessage, senderId: string): Promise<Message>;
  markMessagesAsRead(senderId: string, receiverId: string): Promise<void>;
  getUnreadMessageCount(userId: string): Promise<number>;
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

  // Forum operations
  async getAllForums(userId?: string): Promise<ForumWithDetails[]> {
    const forumsWithDetails = await db
      .select({
        forum: forums,
        creator: users,
        postCount: sql<number>`count(distinct ${forumPosts.id})`,
        memberCount: sql<number>`count(distinct ${forumMemberships.userId})`,
        userRole: userId ? sql<string>`${forumMemberships.role}` : sql<string>`null`,
      })
      .from(forums)
      .leftJoin(users, eq(forums.createdBy, users.id))
      .leftJoin(forumPosts, eq(forums.id, forumPosts.forumId))
      .leftJoin(forumMemberships, and(
        eq(forums.id, forumMemberships.forumId),
        userId ? eq(forumMemberships.userId, userId) : sql`false`
      ))
      .groupBy(forums.id, users.id, forumMemberships.role)
      .orderBy(desc(forums.createdAt));

    return forumsWithDetails.map(row => ({
      ...row.forum,
      creator: row.creator,
      postCount: row.postCount || 0,
      memberCount: row.memberCount || 0,
      userRole: row.userRole,
    }));
  }

  async getForum(id: number, userId?: string): Promise<ForumWithDetails | undefined> {
    const [forumWithDetails] = await db
      .select({
        forum: forums,
        creator: users,
        postCount: sql<number>`count(distinct ${forumPosts.id})`,
        memberCount: sql<number>`count(distinct ${forumMemberships.userId})`,
        userRole: userId ? sql<string>`${forumMemberships.role}` : sql<string>`null`,
      })
      .from(forums)
      .leftJoin(users, eq(forums.createdBy, users.id))
      .leftJoin(forumPosts, eq(forums.id, forumPosts.forumId))
      .leftJoin(forumMemberships, and(
        eq(forums.id, forumMemberships.forumId),
        userId ? eq(forumMemberships.userId, userId) : sql`false`
      ))
      .where(eq(forums.id, id))
      .groupBy(forums.id, users.id, forumMemberships.role);

    if (!forumWithDetails) return undefined;

    return {
      ...forumWithDetails.forum,
      creator: forumWithDetails.creator,
      postCount: forumWithDetails.postCount || 0,
      memberCount: forumWithDetails.memberCount || 0,
      userRole: forumWithDetails.userRole,
    };
  }

  async createForum(forumData: InsertForum, creatorId: string): Promise<Forum> {
    const [forum] = await db
      .insert(forums)
      .values({
        ...forumData,
        createdBy: creatorId,
      })
      .returning();
    
    // 생성자를 관리자로 자동 추가
    await db.insert(forumMemberships).values({
      forumId: forum.id,
      userId: creatorId,
      role: "admin",
    });

    return forum;
  }

  async updateForum(id: number, forumData: Partial<InsertForum>): Promise<Forum | undefined> {
    const [forum] = await db
      .update(forums)
      .set({
        ...forumData,
        updatedAt: new Date(),
      })
      .where(eq(forums.id, id))
      .returning();
    return forum;
  }

  async deleteForum(id: number): Promise<boolean> {
    const result = await db.delete(forums).where(eq(forums.id, id));
    return (result.rowCount || 0) > 0;
  }

  async joinForum(forumId: number, userId: string, role = "member"): Promise<boolean> {
    try {
      await db.insert(forumMemberships).values({
        forumId,
        userId,
        role,
      });
      return true;
    } catch {
      return false;
    }
  }

  async leaveForum(forumId: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(forumMemberships)
      .where(and(
        eq(forumMemberships.forumId, forumId),
        eq(forumMemberships.userId, userId)
      ));
    return (result.rowCount || 0) > 0;
  }

  // Forum post operations
  async getForumPosts(forumId: number, limit = 20, offset = 0): Promise<ForumPostWithDetails[]> {
    const postsWithDetails = await db
      .select({
        post: forumPosts,
        author: users,
        forum: forums,
      })
      .from(forumPosts)
      .leftJoin(users, eq(forumPosts.authorId, users.id))
      .leftJoin(forums, eq(forumPosts.forumId, forums.id))
      .where(eq(forumPosts.forumId, forumId))
      .orderBy(desc(forumPosts.isPinned), desc(forumPosts.lastReplyAt), desc(forumPosts.createdAt))
      .limit(limit)
      .offset(offset);

    return postsWithDetails.map(row => ({
      ...row.post,
      author: row.author,
      forum: row.forum,
    }));
  }

  async getForumPost(id: number): Promise<ForumPostWithDetails | undefined> {
    const [postWithDetails] = await db
      .select({
        post: forumPosts,
        author: users,
        forum: forums,
      })
      .from(forumPosts)
      .leftJoin(users, eq(forumPosts.authorId, users.id))
      .leftJoin(forums, eq(forumPosts.forumId, forums.id))
      .where(eq(forumPosts.id, id));

    if (!postWithDetails) return undefined;

    return {
      ...postWithDetails.post,
      author: postWithDetails.author,
      forum: postWithDetails.forum,
    };
  }

  async createForumPost(postData: InsertForumPost, authorId: string): Promise<ForumPost> {
    const [post] = await db
      .insert(forumPosts)
      .values({
        ...postData,
        authorId,
      })
      .returning();
    return post;
  }

  async updateForumPost(id: number, postData: Partial<InsertForumPost>): Promise<ForumPost | undefined> {
    const [post] = await db
      .update(forumPosts)
      .set({
        ...postData,
        updatedAt: new Date(),
      })
      .where(eq(forumPosts.id, id))
      .returning();
    return post;
  }

  async deleteForumPost(id: number): Promise<boolean> {
    const result = await db.delete(forumPosts).where(eq(forumPosts.id, id));
    return (result.rowCount || 0) > 0;
  }

  async pinForumPost(id: number): Promise<boolean> {
    const [post] = await db
      .update(forumPosts)
      .set({ isPinned: true })
      .where(eq(forumPosts.id, id))
      .returning();
    return !!post;
  }

  async lockForumPost(id: number): Promise<boolean> {
    const [post] = await db
      .update(forumPosts)
      .set({ isLocked: true })
      .where(eq(forumPosts.id, id))
      .returning();
    return !!post;
  }

  async incrementForumPostViews(id: number): Promise<void> {
    await db
      .update(forumPosts)
      .set({ viewCount: sql`${forumPosts.viewCount} + 1` })
      .where(eq(forumPosts.id, id));
  }

  // Forum reply operations
  async getForumReplies(postId: number): Promise<ForumReplyWithDetails[]> {
    const repliesWithDetails = await db
      .select({
        reply: forumReplies,
        author: users,
      })
      .from(forumReplies)
      .leftJoin(users, eq(forumReplies.authorId, users.id))
      .where(eq(forumReplies.postId, postId))
      .orderBy(asc(forumReplies.createdAt));

    return repliesWithDetails.map(row => ({
      ...row.reply,
      author: row.author,
    }));
  }

  async createForumReply(replyData: InsertForumReply, authorId: string): Promise<ForumReply> {
    const [reply] = await db
      .insert(forumReplies)
      .values({
        ...replyData,
        authorId,
      })
      .returning();

    // 포스트의 답글 수와 마지막 답글 정보 업데이트
    await db
      .update(forumPosts)
      .set({
        replyCount: sql`${forumPosts.replyCount} + 1`,
        lastReplyAt: new Date(),
        lastReplyBy: authorId,
      })
      .where(eq(forumPosts.id, reply.postId));

    return reply;
  }

  async updateForumReply(id: number, replyData: Partial<InsertForumReply>): Promise<ForumReply | undefined> {
    const [reply] = await db
      .update(forumReplies)
      .set({
        ...replyData,
        updatedAt: new Date(),
      })
      .where(eq(forumReplies.id, id))
      .returning();
    return reply;
  }

  async deleteForumReply(id: number): Promise<boolean> {
    const result = await db.delete(forumReplies).where(eq(forumReplies.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Message operations
  async getUserConversations(userId: string): Promise<Conversation[]> {
    const conversations = await db
      .select({
        otherUserId: sql<string>`CASE 
          WHEN ${messages.senderId} = ${userId} THEN ${messages.receiverId}
          ELSE ${messages.senderId}
        END`,
        lastMessage: messages,
        otherUser: users,
        unreadCount: sql<number>`COUNT(CASE 
          WHEN ${messages.receiverId} = ${userId} AND ${messages.isRead} = false 
          THEN 1 
        END)`,
      })
      .from(messages)
      .leftJoin(users, sql`${users.id} = CASE 
        WHEN ${messages.senderId} = ${userId} THEN ${messages.receiverId}
        ELSE ${messages.senderId}
      END`)
      .where(sql`${messages.senderId} = ${userId} OR ${messages.receiverId} = ${userId}`)
      .groupBy(
        sql`CASE 
          WHEN ${messages.senderId} = ${userId} THEN ${messages.receiverId}
          ELSE ${messages.senderId}
        END`,
        messages.id, users.id
      )
      .orderBy(desc(messages.createdAt));

    return conversations.map(row => ({
      otherUser: row.otherUser,
      lastMessage: row.lastMessage,
      unreadCount: row.unreadCount || 0,
    }));
  }

  async getConversation(userId: string, otherUserId: string, limit = 50, offset = 0): Promise<MessageWithUsers[]> {
    const conversationMessages = await db
      .select({
        message: messages,
        sender: users,
      })
      .from(messages)
      .leftJoin(users, eq(messages.senderId, users.id))
      .where(
        sql`(${messages.senderId} = ${userId} AND ${messages.receiverId} = ${otherUserId}) OR
            (${messages.senderId} = ${otherUserId} AND ${messages.receiverId} = ${userId})`
      )
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    return conversationMessages.map(row => ({
      ...row.message,
      sender: row.sender,
      receiver: row.sender, // This will be corrected in a proper join
    }));
  }

  async sendMessage(messageData: InsertMessage, senderId: string): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values({
        ...messageData,
        senderId,
      })
      .returning();
    return message;
  }

  async markMessagesAsRead(senderId: string, receiverId: string): Promise<void> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(and(
        eq(messages.senderId, senderId),
        eq(messages.receiverId, receiverId),
        eq(messages.isRead, false)
      ));
  }

  async getUnreadMessageCount(userId: string): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(and(
        eq(messages.receiverId, userId),
        eq(messages.isRead, false)
      ));
    return result.count || 0;
  }
}

export const storage = new DatabaseStorage();
