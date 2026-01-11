const User = require("../../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
exports.doLogin = async (req, res) => {
  try {
    const { userName, password, rememberMe } = req.body;
    const user = await User.findOne({ userName });
    if (!user) return res.status(400).json({ message: "User not present." });
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched)
      return res.status(400).json({ message: "Invalid password" });
    const expiresIn = rememberMe ? "7d" : "1h";

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      expiresIn,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.doSignUp = async (req, res) => {
  try {
    const inputData = req.body;
    console.log(inputData);

    const existingUser = await User.findOne({ userName: inputData?.userName });
    if (existingUser)
      res.status(400).json({ message: "User already present." });
    const hashedPass = await bcrypt.hash(
      inputData?.password,
      parseInt(process.env.SALT || 10)
    );

    const expiresIn = inputData?.rememberMe ? "7d" : "1h";

    const newUser = new User({
      userName: inputData?.userName,
      password: hashedPass,
      firstName: inputData?.firstName,
      lastName: inputData?.lastName,
      email: inputData?.email,
      rememberMe: inputData?.rememberMe,
      dailyUsage: 50,
      lastLogin: moment().format("DD/MM/YYYY hh:mm:ss a"),
      profileImage: inputData?.profileImage,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, userName: newUser.userName },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      expiresIn,
      user: {
        id: newUser._id,
        username: newUser.userName,
        firstName: newUser.firstName,
        dailyUsage: newUser.dailyUsage,
        profileImage: newUser.profileImage,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
