const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

/**
 * REGISTER USER
 * POST /auth/register
 */
router.post("/register", authController.register);

/**
 * LOGIN USER
 * POST /auth/login
 */
router.post("/login", authController.login);

module.exports = router;