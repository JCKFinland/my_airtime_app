const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      wallet: {
        create: { balance: 10000 } // starter wallet
      }
    }
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.json({ token });
};