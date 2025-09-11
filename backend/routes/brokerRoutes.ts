import express, { Router } from "express";
import * as brokerController from "../controllers/brokerController";

const router: Router = express.Router();

router.get("/connect", brokerController.connectBroker);
router.get("/callback", brokerController.callback);
router.get("/profile", brokerController.getProfile);

export default router;
