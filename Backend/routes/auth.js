import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: "User already exists" });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "30d" });
        
        res.status(201).json({ _id: user._id, name: user.name, email: user.email, token });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "30d" });
            res.json({ _id: user._id, name: user.name, email: user.email, token });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;
