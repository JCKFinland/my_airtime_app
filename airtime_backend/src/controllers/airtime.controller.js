const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const walletService = require("../services/wallet.service");

/**
 * BUY AIRTIME
 */
exports.buyAirtime = async (req, res) => {
  const { phone, network, amount } = req.body;
  const userId = req.user.userId;

  try {
    // debit wallet
    await walletService.debitWallet(userId, Number(amount));

    // save transaction
    const tx = await prisma.transaction.create({
      data: {
        type: "airtime",
        phone,
        network,
        amount: Number(amount),
        description: "Airtime Purchase",
        userId,
      },
    });

    return res.json({
      success: true,
      message: "Airtime purchase successful",
      data: tx,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * BUY DATA
 */
exports.buyData = async (req, res) => {
  const { phone, network, bundle, amount } = req.body;
  const userId = req.user.userId;

  try {
    // debit wallet
    await walletService.debitWallet(userId, Number(amount));

    // save transaction
    const tx = await prisma.transaction.create({
      data: {
        type: "data",
        phone,
        network,
        amount: Number(amount),
        description: bundle,
        userId,
      },
    });

    return res.json({
      success: true,
      message: "Data purchase successful",
      data: tx,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**
 * TRANSACTION HISTORY
 */
exports.getHistory = async (req, res) => {
  const userId = req.user.userId;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({
      success: true,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};