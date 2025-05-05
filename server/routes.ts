import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createSession } from "@shared/schema";

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
  
  // Verify OpenAI API key status
  app.get("/api/openai/status", async (req, res) => {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(200).json({ status: "missing" });
    }
    
    try {
      // We just return that the API key exists, without actually validating it
      // In a production app, we would make a test call to OpenAI to verify the key
      res.status(200).json({ status: "configured" });
    } catch (error) {
      console.error("Error checking OpenAI API key:", error);
      res.status(200).json({ status: "error", message: error.message });
    }
  });

  // Create a session
  app.post("/api/sessions", async (req, res) => {
    try {
      const session = await storage.createSession(createSession.parse(req.body));
      res.status(201).json(session);
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  // Get contact info
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // In a real implementation, this would send an email or store in database
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.status(200).json({ success: true, message: "Message received" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
