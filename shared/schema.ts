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

// User storage table - supports multiple auth methods
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password"), // for local auth, hashed
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  nickname: varchar("nickname"), // user's display name
  profileImageUrl: varchar("profile_image_url"),
  authProvider: varchar("auth_provider").notNull().default("local"), // 'local', 'google', 'kakao', 'naver'
  providerId: varchar("provider_id"), // ID from OAuth provider
  isEmailVerified: boolean("is_email_verified").default(false),
  isAdmin: boolean("is_admin").default(false),
  totpSecret: varchar("totp_secret"), // TOTP 인증용 시크릿
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

// Studios table
export const studios = pgTable("studios", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  nameEnglish: varchar("name_english", { length: 100 }),
  foundedYear: integer("founded_year"),
  founder: varchar("founder", { length: 100 }),
  location: varchar("location", { length: 100 }),
  website: varchar("website", { length: 500 }),
  description: text("description"),
  employees: integer("employees"),
  majorWorks: text("major_works").array(),
  awards: text("awards"),
  specialties: text("specialties"),
  trivia: text("trivia"),
  logoUrl: varchar("logo_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UpsertUser = typeof users.$inferInsert;

// Insert schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const loginUserSchema = insertUserSchema.pick({
  email: true,
  password: true,
});
export const registerUserSchema = insertUserSchema.pick({
  email: true,
  password: true,
  nickname: true,
});

// Export types for frontend use
export type LoginData = z.infer<typeof loginUserSchema>;
export type RegisterData = z.infer<typeof registerUserSchema>;
