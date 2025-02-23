import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES module path issues
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

console.log("MONGODB_USER_URI:", process.env.MONGODB_USER_URI ? "✅ Loaded" : "❌ Not Loaded");
console.log("MONGODB_KUNDALI_URI:", process.env.MONGODB_KUNDALI_URI ? "✅ Loaded" : "❌ Not Loaded");
