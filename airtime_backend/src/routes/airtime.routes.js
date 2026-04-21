const express = require("express");
const router = express.Router();

const airtimeController = require("../controllers/airtime.controller");
const auth = require("../middleware/auth.middleware");

/**
 * BUY AIRTIME
 * POST /airtime/buy
 */
router.post("/buy", auth, airtimeController.buyAirtime);

/**
 * BUY DATA
 * POST /airtime/data
 */
router.post("/data", auth, airtimeController.buyData);

// REMOVE OR COMMENT THIS
router.get("/history", auth, airtimeController.getHistory);

/**
 * GET TRANSACTION HISTORY
 * GET /airtime/history
 */
router.get("/history", auth, airtimeController.getHistory);

exports.buyAirtime
exports.buyData
exports.getHistory

module.exports = router;

exports.getHistory = async (req, res) => {
  const userId = req.user.userId;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};