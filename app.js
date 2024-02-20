import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/api.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());

// Body parsing middleware with increased limit
app.use(express.json({ limit: process.env.MAX_JSON_SIZE }));
app.use(express.urlencoded({ limit: process.env.MAX_URL_ENCODED_SIZE }));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: process.env.REQUEST_LIMIT_TIME,
  max: process.env.REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

// Web cache validation and conditional requests in HTTP
app.set("etag", false);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_CONNECTION, { autoIndex: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
  
// API routes
app.get("/", (req, res) => {
  res.send("Hello from express app!");
});
app.use("/api/v1", router);

export default app;
