const express = require("express");
const {
  doLogin,
  doSignUp,
  googleAuth,
} = require("../controllers/auth/auth-controller");
const router = express.Router();

router.post("/google", googleAuth);
router.post("/login", doLogin);
router.post("/signup", doSignUp);

module.exports = router;
