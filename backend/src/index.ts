import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import brokerRoutes from "./routes/brokerRoutes";

dotenv.config();

const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const mongoUri = process.env.MONGO_URI as string;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/broker", brokerRoutes);

const PORT: number = parseInt(process.env.PORT || "5000", 10);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
