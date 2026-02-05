const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // optional auth middleware
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware"); // for file uploads

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
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
