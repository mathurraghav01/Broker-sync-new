
const express = require("express");
const cors = require("cors");
const { syncTrades, addTrade } = require("./services/tradeService");
const { setToken } = require("./services/tokenService");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/set-token", (req, res) => {
  const { userId, broker, token } = req.body;
  setToken(userId, broker, token);
  res.json({ message: "Token stored" });
});

app.get("/sync/:userId/:broker", async (req, res) => {
  try {
    const trades = await syncTrades(req.params.userId, req.params.broker);
    res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/trade", async (req, res) => {
  try {
    const { userId, broker, symbol, quantity, price } = req.body;
    await addTrade(userId, broker, { symbol, quantity, price });
    res.json({ message: "Trade added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
