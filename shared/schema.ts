import { z } from "zod";

// 기본 User 타입 (빌드용 최소 버전)
export type User = {
  id: string;
  email: string;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// 기본 Anime 타입
export type Anime = {
  id: number;
  title: string;
  titleEnglish?: string;
  synopsis?: string;
  posterUrl?: string;
  year?: number;
  status?: string;
  rating?: number;
  createdAt?: Date;
};

// Insert 스키마들
export const insertUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  nickname: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
