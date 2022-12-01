const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.post("/signup", authController.postSignup);

router.post("/signin", authController.postSignIn);

router.post("/signout", authController.postSignOut);

module.exports = router;
