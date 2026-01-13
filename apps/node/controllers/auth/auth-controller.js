const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("ticket", ticket.getPayload());
    const { email, name, picture } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        userName: name,
        password: "##",
        firstName: name,
        lastName: "",
        rememberMe: false,
        dailyUsage: 50,
        lastLogin: moment().format("DD/MM/YYYY hh:mm:ss a"),
        email,
        username: name,
        profileImage: picture,
        // authProvider: "google",
      });
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      token: jwtToken,
      user,
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Google authentication failed", error: error.message });
  }
};

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
      user: {
        id: user._id,
        userName: user.userName,
      },
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
