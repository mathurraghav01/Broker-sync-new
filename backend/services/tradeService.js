
const ZerodhaAdapter = require("../adapters/zerodhaAdapter");
const { getToken, setToken, isTokenExpired } = require("./tokenService");
const { normalizeTrades } = require("../utils/normalizer");
const pool = require("../db");

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS trades (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(50),
      broker VARCHAR(50),
      symbol VARCHAR(20),
      quantity INT,
      price NUMERIC,
      timestamp TIMESTAMP
    )
  `);
}
initDB();

async function syncTrades(userId, broker) {
  let tokenData = getToken(userId, broker);
  if (isTokenExpired(tokenData)) {
    setToken(userId, broker, "newToken123");
    tokenData = getToken(userId, broker);
  }

  let adapter;
  if (broker === "zerodha") adapter = new ZerodhaAdapter(tokenData.token);
  else throw new Error("Broker not supported");

  const rawTrades = await adapter.fetchTrades();
  const normalized = normalizeTrades(rawTrades);

  const res = await pool.query("SELECT * FROM trades WHERE user_id=$1 AND broker=$2", [userId, broker]);
  return [...normalized, ...res.rows];
}

async function addTrade(userId, broker, trade) {
  await pool.query(
    "INSERT INTO trades (user_id, broker, symbol, quantity, price, timestamp) VALUES ($1,$2,$3,$4,$5,$6)",
    [userId, broker, trade.symbol, trade.quantity, trade.price, new Date()]
  );
}

module.exports = { syncTrades, addTrade };
