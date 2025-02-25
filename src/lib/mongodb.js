import mongoose from "mongoose";

const userDB_URI = process.env.MONGODB_USER_URI || "mongodb://localhost:27017/userDB";
const kundaliDB_URI = process.env.MONGODB_KUNDALI_URI || "mongodb://localhost:27017/kundali-matching";

const connectionMap = {
  "userDB": userDB_URI,
  "kundali-matching": kundaliDB_URI,
};

export async function connectDB(dbName = "userDB") {
  try {
    const dbURI = connectionMap[dbName];
    if (!dbURI) {
      throw new Error(`Invalid database name: ${dbName}`);
    }

    if (mongoose.connection.readyState === 1) {
      console.log(`✅ Using existing connection for ${dbName}`);
      return mongoose.connection;
    }

    const connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected successfully to ${dbName}`);
    return connection;
  } catch (error) {
    console.error(`❌ MongoDB connection error for ${dbName}:`, error);
    throw new Error(`Failed to connect to MongoDB - ${dbName}`);
  }
}
