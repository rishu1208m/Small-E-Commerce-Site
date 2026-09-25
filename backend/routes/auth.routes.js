const express = require("express");
const router = express.Router();
const {
  register,
  login,
  me,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");
const authenticate = require("../middlewares/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, me);

module.exports = router;
