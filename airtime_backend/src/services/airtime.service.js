const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * MOCK AIRTIME PROVIDER CALL
 * (Replace later with real VTU API like Reloadly)
 */
const fakeProviderRequest = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: "success",
        providerRef: "MOCK_" + Date.now(),
      });
    }, 1000);
  });
};

/**
 * BUY AIRTIME SERVICE
 */
exports.processAirtime = async ({ userId, phone, network, amount }) => {
  // simulate external provider
  const providerResponse = await fakeProviderRequest();

  if (providerResponse.status !== "success") {
    throw new Error("Airtime provider failed");
  }

  // create transaction record
  const transaction = await prisma.transaction.create({
    data: {
      type: "airtime",
      phone,
      network,
      amount,
      description: "Airtime Purchase",
      userId,
    },
  });

  return transaction;
};

/**
 * BUY DATA SERVICE
 */
exports.processData = async ({ userId, phone, network, bundle, amount }) => {
  // simulate external provider
  const providerResponse = await fakeProviderRequest();

  if (providerResponse.status !== "success") {
    throw new Error("Data provider failed");
  }

  // create transaction record
  const transaction = await prisma.transaction.create({
    data: {
      type: "data",
      phone,
      network,
      amount,
      description: bundle,
      userId,
    },
  });

  return transaction;
};