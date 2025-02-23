import clientPromise from "./lib/mongodb.js"; // adjust the path as needed

async function testConnection() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase"); // replace with your DB name
    // Attempt to list collections
    const collections = await db.listCollections().toArray();
    console.log("MongoDB connection successful. Collections:", collections);
    process.exit(0);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

testConnection();
