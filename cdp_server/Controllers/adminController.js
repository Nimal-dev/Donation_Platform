const authmodels = require('../Models/authModel');
const recipientmodels = require('../Models/recipientModel');
const agentModels = require('../Models/agentModel');
const usermodels = require('../Models/userModel');
const categorymodels = require('../Models/categoryModel');
const DonationModels = require('../Models/DonationModel')
const bcrypt = require('bcrypt');

const authModel = authmodels.auth;
const recipientModel = recipientmodels.recipient;
const agentModel = agentModels.agent;
const recipientmodel = usermodels.user;
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



// ------------------------------------------------------Recipient Controller----------------------------------------------//
exports.AddRecipient = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const loginparam = {
            email: req.body.email,
            password: hashedPassword,
            usertype: req.body.usertype,
        };
        const auth = await authModel.create(loginparam);

        const recipientparam = {    
            recipientname: req.body.recipientname,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
            authid: auth._id
        };
        await recipientModel.create(recipientparam);
        res.json('success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewrecipient = async (req, res) => {
    try {
        const recipient = await recipientModel.find().populate('authid');
        res.json(recipient);
    } catch (error) {
        console.error('Error fetching recipient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.UpdateRecipient = async (req, res) => {
    try {
        const recipientDetails = await recipientModel.findById(req.body.id).populate('authid');
        if (!recipientDetails) {
            return res.status(404).json({ error: 'Recipient not found' });
        }

        res.json({
            recipientDetails,
            authDetails: recipientDetails.authid
        });
    } catch (error) {
        console.error("Error in fetching recipient details:", error);
        res.status(500).json({ error: "An error occurred while fetching the recipient details" });
    }
};

exports.editAndUpdaterecipient = async (req, res) => {
    try {
        const recipientDetails = {
            recipientname: req.body.recipientname,
            contact: req.body.contact,
            location: req.body.location,
            address: req.body.address,
        };
        await recipientModel.findByIdAndUpdate(req.body.id, recipientDetails);

        const loginDetails = {
            email: req.body.email,
            userstatus: req.body.userstatus,
        };
        await authModel.findByIdAndUpdate(req.body.authid, loginDetails);

        res.json("updated");
    } catch (error) {
        console.error("Error in updating Recipient:", error);
        res.status(500).json({ error: "An error occurred while updating the Recipient" });
    }
};

exports.deleteRecipient = async (req, res) => {
    try {
        const recipientId = req.body.id;
        const recipient = await recipientModel.findById(recipientId);

        if (!recipient) {
            return res.status(404).json({ error: 'recipient not found' });
        }

        // Delete associated auth details
        await authModel.findByIdAndDelete(recipient.authid);

        // Delete the recipient
        await recipientModel.findByIdAndDelete(recipientId);

        res.json({ message: 'Recipient and associated auth details deleted successfully' });
    } catch (error) {
        console.error("Error in deleting recipient:", error);
        res.status(500).json({ error: "An error occurred while deleting the recipient" });
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
        res.status(500).json({ error: "An error occurred while fetching the recipient details" });
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
        const recipientId = req._id;
  
        if (!req.file) {
          return res.status(400).json({ error: 'Image is required' });
        }
  
        const imageUrl = `/uploads/${req.file.filename}`;
  
        const donationParam = {
          donationName,
          donationDescription,
          donationPrice,
          imageUrl,
          recipientId,
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

