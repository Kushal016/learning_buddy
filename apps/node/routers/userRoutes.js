const express = require("express");
const {
  doLogin,
  doSignUp,
  googleAuth,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth/auth-controller");
const router = express.Router();

router.post("/google", googleAuth);
router.post("/login", doLogin);
router.post("/signup", doSignUp);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
