import { Request, Response } from "express";
import * as zerodha from "../services/zerodhaAdapter";

export const connectBroker = async (req: Request, res: Response): Promise<void> => {
  try {
    const url = await zerodha.generateLoginUrl();
    res.json({ loginUrl: url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const callback = async (req: Request, res: Response): Promise<void> => {
  const { requestToken } = req.query;

  if (!requestToken || typeof requestToken !== "string") {
    res.status(400).json({ error: "Missing or invalid requestToken" });
    return;
  }

  try {
    const session = await zerodha.setAccessToken(requestToken);
    res.json({ message: "Broker linked", session });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await zerodha.getProfile();
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
