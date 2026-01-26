const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// 1️⃣ Define the schema
const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // normalize email
      trim: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true },
);

// 2️⃣ Pre-save hook to hash password
UserSchema.pre("save", async function () {
  // Only hash if password is modified or new
  if (!this.isModified("password")) return;

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// 3️⃣ Method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// 4️⃣ Export the model
module.exports = mongoose.model("User", UserSchema);
