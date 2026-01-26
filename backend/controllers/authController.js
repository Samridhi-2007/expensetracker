const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// 🔥 REGISTER USER
exports.registerUser = async (req, res) => {
  // Safe destructuring: req.body || {}
  const { fullName, email, password, profileImageUrl } = req.body || {};

  console.log("[REGISTER] req.body:", req.body);

  // Check required fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // Send response
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("[REGISTER ERROR]:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 🔥 LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  console.log("[LOGIN] req.body:", req.body);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("[LOGIN ERROR]:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// 🔥 GET USER INFO (protected route)
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user set by protect middleware
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error("[GET USER INFO ERROR]:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
