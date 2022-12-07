const express = require("express");

const authController = require("../controllers/auth");
const refreshToken = require("../controllers/resetToken");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/api/signup", authController.postSignup);

router.post("/api/signin", authController.postSignIn);

router.post("/api/signout", authController.postSignOut);

// router.get("/token", refreshToken);

module.exports = router;
