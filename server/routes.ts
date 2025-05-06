import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";


export async function registerRoutes(app: Express): Promise<Server> {
  // Get OpenAI token for client-side usage
  app.get("/token", async (req, res) => {
    try {
      // We're providing the actual API key from environment variables
      // In a real production app, we would implement token validation and rate limiting
      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "OpenAI API key not configured" });
      }
      
      const clientSecret = {
        value: process.env.OPENAI_API_KEY,
        expires_at: new Date(Date.now() + 3600 * 1000).toISOString(),
      };
      
      res.json({ client_secret: clientSecret });
    } catch (error) {
      console.error("Error generating token:", error);
      res.status(500).json({ error: "Failed to generate token" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
