const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getWallet = async (userId) => {
  return prisma.wallet.findUnique({ where: { userId } });
};

exports.debitWallet = async (userId, amount) => {
  const wallet = await prisma.wallet.findUnique({ where: { userId } });

  if (wallet.balance < amount) {
    throw new Error("Insufficient balance");
  }

  return prisma.wallet.update({
    where: { userId },
    data: {
      balance: wallet.balance - amount
    }
  });
};