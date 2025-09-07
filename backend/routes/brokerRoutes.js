const express = require("express");
const router = express.Router();

const brokerController = rquire("../controllers/brokerController");

router.get("/connect",brokerController.connectBroker);
router.get("/callback",brokerController.callback);
router.get("/profile",brokerController.getProfile);

module.exports = router;