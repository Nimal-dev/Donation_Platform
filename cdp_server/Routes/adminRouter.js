const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Define your routes here
router.post('/AddDonor', adminController.AddDonor);
router.get('/viewdonor', adminController.viewdonor);
router.post('/updateDonorById', adminController.UpdateDonor);
router.post('/editAndUpdateDonor', adminController.editAndUpdateDonor);
router.post('/deleteDonor', adminController.deleteDonor);




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
