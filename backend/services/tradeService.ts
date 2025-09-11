import ZerodhaAdapter from "../adapters/zerodhaAdapter";
import { getToken, setToken, isTokenExpired } from "./tokenService";
import { normalizeTrades } from "../utils/normalizer";
import pool from "../db";

// Type for a trade record
export interface Trade {
  symbol: string;
  quantity: number;
  price: number;
  timestamp?: Date;
}

// Initialize trades table if not exists
async function initDB(): Promise<void> {
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

/**
 * Sync trades for a user and broker
 */
export async function syncTrades(userId: string, broker: string): Promise<Trade[]> {
  let tokenData = getToken(userId, broker);
  if (isTokenExpired(tokenData)) {
    setToken(userId, broker, "newToken123"); // TODO: refresh via broker API
    tokenData = getToken(userId, broker);
  }

  if (!tokenData) {
    throw new Error("Failed to obtain broker token");
  }

  let adapter: any;
  if (broker === "zerodha") {
    adapter = new ZerodhaAdapter(tokenData.token);
  } else {
    throw new Error("Broker not supported");
  }

  const rawTrades = await adapter.fetchTrades();
  const normalized: Trade[] = normalizeTrades(rawTrades);

  const res = await pool.query("SELECT * FROM trades WHERE user_id=$1 AND broker=$2", [userId, broker]);

  return [...normalized, ...res.rows];
}

/**
 * Add a new trade
 */
export async function addTrade(userId: string, broker: string, trade: Trade): Promise<void> {
  await pool.query(
    "INSERT INTO trades (user_id, broker, symbol, quantity, price, timestamp) VALUES ($1,$2,$3,$4,$5,$6)",
    [userId, broker, trade.symbol, trade.quantity, trade.price, new Date()]
  );
}
