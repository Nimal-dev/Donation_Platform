const express = require('express');
const router = express.Router();
const agentController = require('../Controllers/agentController');

// Define your routes here
router.post('/sendresourceRequest', agentController.sendresourceRequest);
router.get('/getresourceRequest', agentController.getResourceRequest);

module.exports = router;
