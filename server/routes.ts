import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import OpenAI from "openai";
import { createClient } from '@supabase/supabase-js';
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// Define schemas for input validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

// Password hashing utilities
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Simple session management
const sessions: Map<string, { userId: number; expiresAt: Date }> = new Map();

// Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.headers.authorization?.split(" ")[1];
  
  if (!sessionId) {
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized" 
    });
  }
  
  const session = sessions.get(sessionId);
  
  if (!session || new Date() > session.expiresAt) {
    if (session) {
      sessions.delete(sessionId);
    }
    return res.status(401).json({ 
      success: false, 
      message: "Session expired" 
    });
  }
  
  // Attach user ID to request
  (req as any).userId = session.userId;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: "Username is already taken" 
        });
      }
      
      // Hash password
      const hashedPassword = await hashPassword(validatedData.password);
      
      // Create user
      const user = await storage.createUser({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword
      });
      
      return res.status(201).json({ 
        success: true, 
        message: "User registered successfully",
        user: { 
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error registering user:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to register user" 
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByUsername(validatedData.email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid email or password" 
        });
      }
      
      // Verify password
      const isPasswordValid = await comparePasswords(validatedData.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid email or password" 
        });
      }
      
      // Create session
      const sessionId = randomBytes(32).toString("hex");
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
      
      sessions.set(sessionId, { 
        userId: user.id,
        expiresAt
      });
      
      return res.status(200).json({ 
        success: true, 
        message: "Login successful",
        user: { 
          id: user.id,
          username: user.username,
          email: user.email
        },
        sessionId,
        expiresAt
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error logging in:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to log in" 
      });
    }
  });

  app.post("/api/auth/logout", requireAuth, (req, res) => {
    const sessionId = req.headers.authorization?.split(" ")[1];
    if (sessionId) {
      sessions.delete(sessionId);
    }
    
    return res.status(200).json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    try {
      const userId = (req as any).userId;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: "User not found" 
        });
      }
      
      return res.status(200).json({ 
        id: user.id,
        username: user.username,
        email: user.email
      });
    } catch (error) {
      console.error("Error getting user:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to get user information" 
      });
    }
  });

  // API endpoint for OpenAI chat completions
  app.post("/api/chat", requireAuth, async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!Array.isArray(messages)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request format. 'messages' must be an array." 
        });
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      return res.status(200).json({
        success: true,
        data: response.choices[0].message.content
      });
    } catch (error: any) {
      console.error("Error in OpenAI chat completion:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to get a response from OpenAI"
      });
    }
  });

  // API endpoint for environment configuration
  app.get("/api/config", (req, res) => {
    res.json({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
  });

  // Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real implementation, you would use a service like Nodemailer here
      // to send an email with the contact form data
      
      // For now, just log the data and return a success message
      console.log("Contact form submission:", validatedData);
      
      // Store the contact submission
      const contact = await storage.createContact(validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        data: contact
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Failed to process contact form submission" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
