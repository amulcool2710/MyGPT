import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", chatRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err.stack);
    res.status(500).json({ error: "Something went wrong! Please try again later." });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
