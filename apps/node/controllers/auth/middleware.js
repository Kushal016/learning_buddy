// import User from "../../models/User";
const User = require("../../models/User");

const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || null;
    if (header === null || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Failed to authenticate" });
    }
    const token = header.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = auth;
