import express, { Application, Request, Response } from "express";
import cors from "cors";
import { syncTrades, addTrade, Trade } from "./services/tradeService";
import { setToken } from "./services/tokenService";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.post("/set-token", (req: Request, res: Response) => {
  const { userId, broker, token } = req.body as {
    userId: string;
    broker: string;
    token: string;
  };

  setToken(userId, broker, token);
  res.json({ message: "Token stored" });
});

app.get("/sync/:userId/:broker", async (req: Request, res: Response) => {
  try {
    const { userId, broker } = req.params;
    const trades = await syncTrades(userId, broker);
    res.json(trades);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/trade", async (req: Request, res: Response) => {
  try {
    const { userId, broker, symbol, quantity, price } = req.body as {
      userId: string;
      broker: string;
      symbol: string;
      quantity: number;
      price: number;
    };

    const trade: Trade = { symbol, quantity, price };
    await addTrade(userId, broker, trade);

    res.json({ message: "Trade added successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
