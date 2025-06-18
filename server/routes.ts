import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertAnimePostSchema, 
  insertTagSchema, 
  insertReviewSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Anime routes
  app.get('/api/anime', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const status = req.query.status as string || "approved";
      
      const animePosts = await storage.getAllAnimePosts(limit, offset, status);
      res.json(animePosts);
    } catch (error) {
      console.error("Error fetching anime posts:", error);
      res.status(500).json({ message: "Failed to fetch anime posts" });
    }
  });

  app.get('/api/anime/search', async (req, res) => {
    try {
      const query = req.query.q as string || "";
      const tagIds = req.query.tags ? (req.query.tags as string).split(',').map(Number) : undefined;
      
      const animePosts = await storage.searchAnimePosts(query, tagIds);
      res.json(animePosts);
    } catch (error) {
      console.error("Error searching anime posts:", error);
      res.status(500).json({ message: "Failed to search anime posts" });
    }
  });

  app.get('/api/anime/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid anime ID" });
      }

      const animePost = await storage.getAnimePost(id);
      if (!animePost) {
        return res.status(404).json({ message: "Anime not found" });
      }

      // Increment view count
      await storage.incrementViewCount(id);
      
      res.json(animePost);
    } catch (error) {
      console.error("Error fetching anime post:", error);
      res.status(500).json({ message: "Failed to fetch anime post" });
    }
  });

  app.post('/api/anime', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validation = insertAnimePostSchema.extend({
        tags: z.array(z.string()).optional(),
      }).safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({ message: "Invalid input", errors: validation.error.errors });
      }

      const { tags: tagNames, ...animeData } = validation.data;
      let tagIds: number[] = [];

      // Handle tags
      if (tagNames && tagNames.length > 0) {
        const existingTags = await storage.getTagsByNames(tagNames);
        const existingTagNames = existingTags.map(t => t.name);
        
        // Create new tags
        const newTagNames = tagNames.filter(name => !existingTagNames.includes(name));
        const newTags = [];
        for (const name of newTagNames) {
          const tag = await storage.createTag({ name });
          newTags.push(tag);
        }

        tagIds = [...existingTags.map(t => t.id), ...newTags.map(t => t.id)];
      }

      const animePost = await storage.createAnimePost(animeData, userId, tagIds);
      res.status(201).json(animePost);
    } catch (error) {
      console.error("Error creating anime post:", error);
      res.status(500).json({ message: "Failed to create anime post" });
    }
  });

  // Admin routes
  app.get('/api/admin/pending', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const pendingPosts = await storage.getPendingAnimePosts();
      res.json(pendingPosts);
    } catch (error) {
      console.error("Error fetching pending posts:", error);
      res.status(500).json({ message: "Failed to fetch pending posts" });
    }
  });

  app.post('/api/admin/approve/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const id = parseInt(req.params.id);
      const approvedPost = await storage.approveAnimePost(id, user.id);
      
      if (!approvedPost) {
        return res.status(404).json({ message: "Anime post not found" });
      }

      res.json(approvedPost);
    } catch (error) {
      console.error("Error approving anime post:", error);
      res.status(500).json({ message: "Failed to approve anime post" });
    }
  });

  app.post('/api/admin/reject/:id', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const id = parseInt(req.params.id);
      const rejectedPost = await storage.rejectAnimePost(id);
      
      if (!rejectedPost) {
        return res.status(404).json({ message: "Anime post not found" });
      }

      res.json(rejectedPost);
    } catch (error) {
      console.error("Error rejecting anime post:", error);
      res.status(500).json({ message: "Failed to reject anime post" });
    }
  });

  // Review routes
  app.get('/api/anime/:id/reviews', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const reviews = await storage.getReviewsForAnime(id);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post('/api/anime/:id/reviews', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const animePostId = parseInt(req.params.id);
      
      const validation = insertReviewSchema.safeParse({
        ...req.body,
        animePostId,
      });

      if (!validation.success) {
        return res.status(400).json({ message: "Invalid input", errors: validation.error.errors });
      }

      const review = await storage.createReview(validation.data, userId);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Favorite routes
  app.post('/api/anime/:id/favorite', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const animePostId = parseInt(req.params.id);
      
      const isFavorited = await storage.toggleFavorite(userId, animePostId);
      res.json({ isFavorited });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      res.status(500).json({ message: "Failed to toggle favorite" });
    }
  });

  app.get('/api/favorites', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const favorites = await storage.getUserFavorites(userId);
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  // Tag routes
  app.get('/api/tags', async (req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
