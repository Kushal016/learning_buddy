const express = require("express");
const { doLogin, doSignUp } = require("../controllers/auth/auth-controller");
const router = express.Router();

router.post("/login", doLogin);
router.post("/signup", doSignUp);

module.exports = router;
