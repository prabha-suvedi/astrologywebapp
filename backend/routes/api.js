import express from "express";
import User from "../models/User.js"; // Ensure you have a User model
import bcrypt from "bcryptjs";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save User
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
