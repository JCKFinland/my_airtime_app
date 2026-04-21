const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * GET WALLET BALANCE
 */
exports.getWallet = async (req, res) => {
  const userId = req.user.userId;

  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    res.json({
      success: true,
      data: wallet,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * TOP UP WALLET
 */
exports.topUpWallet = async (req, res) => {
  const userId = req.user.userId;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid top-up amount",
    });
  }

  try {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: "Wallet not found",
      });
    }

    const updatedWallet = await prisma.wallet.update({
      where: { userId },
      data: {
        balance: wallet.balance + Number(amount),
      },
    });

    res.json({
      success: true,
      message: "Wallet topped up successfully",
      data: updatedWallet,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/**
 * INTERNAL: DEBIT WALLET (USED BY AIRTIME / DATA)
 * NOT EXPOSED AS ROUTE
 */
exports.debitWallet = async (userId, amount) => {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  if (wallet.balance < amount) {
    throw new Error("Insufficient balance");
  }

  return prisma.wallet.update({
    where: { userId },
    data: {
      balance: wallet.balance - Number(amount),
    },
  });
};