const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Define your routes here
router.post('/AddDonor', adminController.AddDonor);
router.get('/viewdonor', adminController.viewdonor);
router.post('/updateDonorById', adminController.UpdateDonor);
router.post('/editAndUpdateDonor', adminController.editAndUpdateDonor);
router.post('/deleteDonor', adminController.deleteDonor);



router.post('/updateVolunteerById', adminController.UpdateVolunteer);;
router.post('/editAndUpdateVolunteer', adminController.editAndUpdateVolunteer);
router.get('/viewvolunteer', adminController.viewvolunteer);
router.get('/viewRecipient', adminController.viewRecipient);
router.post('/AddVolunteer', adminController.AddVolunteer);
router.post('/deleteVolunteer', adminController.deleteVolunteer);


router.post('/AddCategory', adminController.AddCategory);
router.get('/viewCategories', adminController.viewCategories);
router.post('/deleteCategories', adminController.deleteCategories);


router.post('/AddDonation', adminController.AddDonation);
router.get('/ViewDonations', adminController.ViewDonations);



module.exports = router;
