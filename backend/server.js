import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import zodiacRoutes from "./routes/zodiac.js";
import apiRoutes from "./routes/api.js"; // Signup and other DB-related APIs

dotenv.config(); // Load environment variables

const app1 = express(); // First app (Database API)
const app2 = express(); // Second app (Zodiac API)

const DB_PORT = process.env.DB_PORT || 5001; // Port for MongoDB-related APIs
const ZODIAC_PORT = process.env.ZODIAC_PORT || 5000; // Port for Zodiac API

// 1. Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myDatabase");
    console.log(`✅ MongoDB connected on port ${DB_PORT}`);
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
})();

// 2. Enable CORS
app1.use(cors());
app2.use(cors());

// 3. Middleware to parse JSON
app1.use(express.json());
app2.use(express.json());

// 4. Routes
app1.use("/api", apiRoutes); // Database API (Signup, Users, etc.)
app2.use("/zodiac", zodiacRoutes); // Zodiac API

// 5. Default Routes
app1.get("/", (req, res) => res.send("✅ Welcome to the Database API!"));
app2.get("/", (req, res) => res.send("✅ Welcome to the Zodiac API!"));

// 6. Start Both Servers
app1.listen(DB_PORT, () => console.log(`🚀 Database API running on http://localhost:${DB_PORT}`));
app2.listen(ZODIAC_PORT, () => console.log(`🔮 Zodiac API running on http://localhost:${ZODIAC_PORT}`));
