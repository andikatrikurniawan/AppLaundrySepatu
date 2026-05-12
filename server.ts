import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lazy initialization of Firebase Admin
let adminApp: admin.app.App | null = null;
function getAdmin() {
  if (!adminApp) {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountPath) {
      adminApp = admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(serviceAccountPath)),
      });
    } else {
      // Fallback for environments with ADC or if just starting
      try {
        adminApp = admin.initializeApp();
      } catch (e) {
        console.warn("Firebase Admin could not be initialized. Please set FIREBASE_SERVICE_ACCOUNT_KEY in .env");
      }
    }
  }
  return adminApp;
}

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const app = getAdmin();
    if (!app) throw new Error("Firebase Admin not initialized");
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "ShoeWash API is running" });
  });

  // Protected route example: Verify User
  app.get("/api/auth/verify", authenticateUser, (req, res) => {
    res.json({ 
      status: "authenticated", 
      user: (req as any).user 
    });
  });

  // Example: Protected Admin-only route
  app.get("/api/admin/stats", authenticateUser, async (req, res) => {
    const user = (req as any).user;
    // You could check custom claims or database role here
    res.json({ 
      message: "This is a protected admin route",
      requestedBy: user.email 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
