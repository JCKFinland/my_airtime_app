const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const walletRoutes = require("./routes/wallet.routes");
const airtimeRoutes = require("./routes/airtime.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/wallet", walletRoutes);
app.use("/airtime", airtimeRoutes);

app.get("/", (req, res) => {
  res.send("Airtime API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});