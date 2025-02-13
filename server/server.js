// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import contactRoutes from "./routes/contactRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// Load environment variables early
dotenv.config();

const app = express();

// Security middleware
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL
      : ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  express.json({
    limit: "50mb",
    verify: (req, res, buf) => {
      if (req.originalUrl === "/api/payment/webhook") {
        req.rawBody = buf.toString();
      }
    },
  })
);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/lecture", lectureRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

let server; // Declare server variable in wider scope

// Graceful shutdown function
const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully.`);
  if (server) {
    server.close(() => {
      console.log("🔚 HTTP server closed");
      // Close database connection
      mongoose.connection.close(false).then(() => {
        console.log("📡 MongoDB connection closed");
        process.exit(0);
      });
    });
  }
};

// Server startup function
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("📡 MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    server = app.listen(PORT, () => {
      console.log(`
🚀 Server running in ${
        process.env.NODE_ENV || "development"
      } mode on port ${PORT}
👉 http://localhost:${PORT}
      `);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("❌ UNHANDLED REJECTION! Shutting down...");
      console.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("❌ UNCAUGHT EXCEPTION! Shutting down...");
      console.error(err.name, err.message);
      process.exit(1);
    });

    // Handle shutdown signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

// Start the server
startServer();