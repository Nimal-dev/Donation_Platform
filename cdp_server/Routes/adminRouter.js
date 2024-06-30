const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Define your routes here
router.post('/AddRecipient', adminController.AddRecipient);
router.get('/viewRecipient', adminController.viewrecipient);
router.post('/updateRecipientById', adminController.UpdateRecipient);
router.post('/editAndUpdateRecipient', adminController.editAndUpdaterecipient);
router.post('/deleteRecipient', adminController.deleteRecipient);




router.post('/updateAgentById', adminController.UpdateAgent);;
router.post('/editAndUpdateAgent', adminController.editAndUpdateAgent);
router.get('/viewAgent', adminController.viewAgent);
router.get('/viewRecipient', adminController.viewRecipient);
router.post('/AddAgent', adminController.AddAgent);
router.post('/deleteAgents', adminController.deleteAgents);


router.post('/AddCategory', adminController.AddCategory);
router.get('/viewCategories', adminController.viewCategories);
router.post('/deleteCategories', adminController.deleteCategories);
router.post('/deleteDonation', adminController.deleteDonation);


router.post('/AddDonation', adminController.AddDonation);
router.get('/ViewDonations', adminController.ViewDonations);



module.exports = router;
