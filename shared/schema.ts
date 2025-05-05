import { pgTable, text, serial, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Session model
export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  language: text("language").notNull(),
  startedAt: timestamp("started_at").defaultNow(),
  endedAt: timestamp("ended_at"),
  active: boolean("active").default(true),
});

export const createSession = z.object({
  userId: z.number().optional(),
  language: z.string(),
});

// Conversation model
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => sessions.id),
  message: text("message").notNull(),
  role: text("role").notNull(), // user or assistant
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: json("metadata"),
});

export const createConversation = z.object({
  sessionId: z.number(),
  message: z.string(),
  role: z.enum(["user", "assistant"]),
  metadata: z.any().optional(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof createSession>;

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof createConversation>;
