import mongoose from "mongoose";

const connection = {}; // Store connections to prevent multiple connections

export async function connectUserDB() {
    if (connection.userDB) {
        console.log("🔄 Already connected to userDB.");
        return connection.userDB;
    }

    try {
        const db = await mongoose.createConnection(process.env.MONGODB_USER_URI).asPromise();
        connection.userDB = db;
        console.log("✅ Connected to userDB.");
        return db;
    } catch (error) {
        console.error("❌ Error connecting to userDB:", error);
        throw error;
    }
}

export async function connectKundaliDB() {
    if (connection.kundaliDB) {
        console.log("🔄 Already connected to kundali-matching.");
        return connection.kundaliDB;
    }

    try {
        const db = await mongoose.createConnection(process.env.MONGODB_KUNDALI_URI).asPromise();
        connection.kundaliDB = db;
        console.log("✅ Connected to kundali-matching.");
        return db;
    } catch (error) {
        console.error("❌ Error connecting to kundali-matching:", error);
        throw error;
    }
}
