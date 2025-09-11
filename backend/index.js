import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();


app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running 🚀");
});

const PORT: number = parseInt(process.env.PORT || "5001", 10);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
