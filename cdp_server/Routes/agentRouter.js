const express = require("express");
const router = express.Router();
const agentController = require("../Controllers/agentController");

router.get("/getAgentProfile/:id", agentController.getAgentProfile);

module.exports = router;
