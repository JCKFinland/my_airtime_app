const express = require("express");
const router = express.Router();

const walletController = require("../controllers/wallet.controller");
const auth = require("../middleware/auth.middleware");

/**
 * GET WALLET BALANCE
 * GET /wallet
 */
router.get("/", auth, walletController.getWallet);

/**
 * TOP UP WALLET
 * POST /wallet/topup
 */
router.post("/topup", auth, walletController.topUpWallet);

module.exports = router;