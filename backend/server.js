require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// 1️⃣ Connect to MongoDB
connectDB();

const app = express();

// 2️⃣ Middleware for CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 3️⃣ Middleware to parse request body
// ✅ This fixes req.body undefined
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form submissions

// 4️⃣ Debug middleware to log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// 5️⃣ Routes
app.use("/api/v1/users", authRoutes);

// 6️⃣ Default route for testing
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// 7️⃣ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
