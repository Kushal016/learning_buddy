const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rememberMe: { type: Boolean },
  dailyUsage: { type: Number },
  lastLogin: { type: String },
  profileImage: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
});

module.exports = mongoose.model("User-profile", userSchema);
