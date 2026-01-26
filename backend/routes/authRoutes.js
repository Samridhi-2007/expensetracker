const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // optional auth middleware
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// 🔥 Add debug middleware for this router
router.use((req, res, next) => {
  console.log(`[AUTH ROUTES] ${req.method} ${req.originalUrl}`);
  console.log("Body:", req.body); // check incoming body
  next();
});

// ✅ Registration route
router.post("/register", registerUser);

// ✅ Login route
router.post("/login", loginUser);

// ✅ Get user info route (protected)
// router.get("/getUser", protect, getUserInfo);

module.exports = router;
