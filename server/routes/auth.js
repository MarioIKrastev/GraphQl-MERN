const express = require("express");

const authController = require("../controllers/auth");
const refreshToken = require("../controllers/resetToken");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/signup", authController.postSignup);

router.post("/signin", authController.postSignIn);

router.post("/signout", verifyToken, authController.postSignOut);

router.get("/token", refreshToken);

module.exports = router;
