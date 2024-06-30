const authmodels = require('../Models/authModel');
const donormodels = require('../Models/donorModel');
const agentModels = require('../Models/agentModel');
const recipientmodels = require('../Models/userModel');
const categorymodels = require('../Models/categoryModel');
const DonationModels = require('../Models/DonationModel')
const bcrypt = require('bcrypt');

const authModel = authmodels.auth;
const donorModel = donormodels.donor;
const agentModel = agentModels.agent;
const recipientmodel = recipientmodels.user;
const categorymodel = categorymodels.category;

const DonationModel = DonationModels.donation;


const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('image');



// ------------------------------------------------------Donor Controller----------------------------------------------//
exports.AddDonor = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const loginparam = {
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(loginparam);

        const donorparam = {    
            donorname: req.body.donorname,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
            authid: auth._id
        };
        await donorModel.create(donorparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewdonor = async (req, res) => {
    try {
        const donors = await donorModel.find().populate('authid');
        res.json(donors);
    } catch (error) {
        console.error('Error fetching donor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.UpdateDonor = async (req, res) => {
    try {
        const donorDetails = await donorModel.findById(req.body.id).populate('authid');
        if (!donorDetails) {
            return res.status(404).json({ error: 'donor not found' });
        }

        res.json({
            donorDetails,
            authDetails: donorDetails.authid
        });
    } catch (error) {
        console.error("Error in fetching donor details:", error);
        res.status(500).json({ error: "An error occurred while fetching the donor details" });
    }
};

exports.editAndUpdateDonor = async (req, res) => {
    try {
        const donorDetails = {
            donorname: req.body.donorname,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
        };
        await donorModel.findByIdAndUpdate(req.body.id, donorDetails);

        const loginDetails = {
            email: req.body.email,
            userstatus: req.body.userstatus,
        };
        await authModel.findByIdAndUpdate(req.body.authid, loginDetails);

        res.json("updated");
    } catch (error) {
        console.error("Error in updating donor:", error);
        res.status(500).json({ error: "An error occurred while updating the donor" });
    }
};

exports.deleteDonor = async (req, res) => {
    try {
        const donorId = req.body.id;
        const donor = await donorModel.findById(donorId);

        if (!donor) {
            return res.status(404).json({ error: 'donor not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(donor.authid);

        // Delete the donor
        await donorModel.findByIdAndDelete(donorId);

        res.json({ message: 'Donor and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting donor:", error);
        res.status(500).json({ error: "An error occurred while deleting the donor" });
    }
};

// ------------------------------------------------------Agent Controller----------------------------------------------//

exports.AddAgent = async (req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const loginparam = {
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(loginparam);

        const agentparam = {    
            agentname: req.body.agentname,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
            authid: auth._id
        };
        await agentModel.create(agentparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.viewAgent = async (req, res) => {
    try {
        const agents = await agentModel.find().populate('authid');
        res.json(agents);
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




exports.deleteAgents = async (req, res) => {
    try {
        const agentId = req.body.id;
        const agent = await agentModel.findById(agentId);

        if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(agent.authid);

        // Delete the volunteer
        await agentModel.findByIdAndDelete(agentId);

        res.json({ message: 'Agent and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Agent:", error);
        res.status(500).json({ error: "An error occurred while deleting the Agent" });
    }
};
exports.editAndUpdateAgent = async (req, res) => {
    try {
        const agentDetails = {
            agentname: req.body.agentname,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
        };
        await agentModel.findByIdAndUpdate(req.body.id, agentDetails);

        const loginDetails = {
            email: req.body.email,
            userstatus: req.body.userstatus,
        };
        await authModel.findByIdAndUpdate(req.body.authid, loginDetails);

        res.json("updated");
    } catch (error) {
        console.error("Error in updating agent:", error);
        res.status(500).json({ error: "An error occurred while updating the volunteer" });
    }
};

exports.UpdateAgent = async (req, res) => {
    try {
        const agentDetails = await agentModel.findById(req.body.id).populate('authid');
        console.log(agentDetails);
        if (!agentDetails) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        res.json({
            agentDetails,
            authDetails: agentDetails.authid
        });
    } catch (error) {
        console.error("Error in fetching agent details:", error);
        res.status(500).json({ error: "An error occurred while fetching the donor details" });
    }
};
// -----------------------------------------------------------------------------//

exports.viewRecipient = async (req, res) => {
    try {
        const recipients = await recipientmodel.find().populate('authid');
        res.json(recipients);
    } catch (error) {
        console.error('Error fetching recipients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// ADD CATEGORY
exports.AddCategory = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file', details: err });
      }
  
      try {
        const { categoryName } = req.body;
  
        if (!req.file) {
          return res.status(400).json({ error: 'Image is required' });
        }
  
        // Constructing the image URL
        const CatImage = `/uploads/${req.file.filename}`;
  
        const categoryParam = {
          categoryname: categoryName,
          image: CatImage,
        };
  
        await categorymodel.create(categoryParam);
        res.json({ message: 'Category added successfully' });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  };


  exports.viewCategories = async (req, res) => {
    try {
        const categories = await categorymodel.find();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteCategories = async (req, res) => {
    try {
        const categoryId = req.body.id;
        const category = await categorymodel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Delete the volunteer
        await categorymodel.findByIdAndDelete(categoryId);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Category:", error);
        res.status(500).json({ error: "An error occurred while deleting the Category" });
    }
};


// -----------------Add Donation------------------------- //

exports.AddDonation = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading file', details: err });
      }
  
      try {
        const { donationName, donationDescription, donationPrice } = req.body;
        const donorId = req._id;
  
        if (!req.file) {
          return res.status(400).json({ error: 'Image is required' });
        }
  
        const imageUrl = `/uploads/${req.file.filename}`;
  
        const donationParam = {
          donationName,
          donationDescription,
          donationPrice,
          imageUrl,
          donorId,
        };
  
        await DonationModel.create(donationParam);
        res.json({ message: 'Donation added successfully' });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  };

  // Function to view products for a specific seller
exports.ViewDonations = async (req, res) => {
    try {
      const donations = await DonationModel.find();
      res.json(donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  exports.deleteDonation = async (req, res) => {
    try {
        const donationId = req.body.id;
        const donation = await DonationModel.findById(donationId);

        if (!donation) {
            return res.status(404).json({ error: 'donation not found' });
        }

        // Delete the volunteer
        await DonationModel.findByIdAndDelete(donationId);

        res.json({ message: 'Donation deleted successfully' });
    } catch (error) {
        console.error("Error in deleting Donation:", error);
        res.status(500).json({ error: "An error occurred while deleting the Donation" });
    }
};

